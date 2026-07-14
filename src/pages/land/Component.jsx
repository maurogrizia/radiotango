import {    useContext,
            useEffect,
            useState }          from "react";
import {    useParams }         from 'react-router-dom';
import {    getArtists,
            getWeeksArtist }    from "utils/artists";
import {    getPlaylists }      from 'utils/playlists';
import {    FaRegWindowClose }  from "react-icons/fa";

import      ContentContext      from "context/content/Context";
import      LanguageContext     from 'context/language/Context';
import      RTLink              from "components/link/Component";
import      * as dictionary     from './lang/index.js';

import './styles.css';


const Component = () => {
    const { language,
            changeLanguage } = useContext(LanguageContext);
    const { changeIsClosedRight,
            changeWeeksArtist } = useContext(ContentContext);
    const text = dictionary[language];
    const params = useParams();
    //const [artist, setArtist] = useState(null);
    //const [playlist, setPlaylist] = useState(null);
    const artist = {
        href: 'goyeneche',
        name: 'Roberto Goyeneche'
    };
    const playlist = {
        href: 'lofi',
        name: 'Lofi Tango'
    };

    const getIsFirstVisit = () => {
        const localIFV = window.localStorage.getItem('isFirstVisit') === null;
        const isFirstVisit = localIFV;

        return isFirstVisit;
    };

    const [isFirstVisit, setIsFirstVisit] = useState(getIsFirstVisit());

    const togglePanel = () => {
		const panel = document.querySelector('#land');
		
		if (panel.classList.contains('open')) {
			panel.classList.remove('open');
			panel.classList.add('close');

		} else {
			panel.classList.remove('close');
			panel.classList.add('open');
		}
  	};


    useEffect(() => {
        const fetchData = async () => {
            const promises = [
                getArtists(),
                getPlaylists(),
            ];
            const results = await Promise.all(promises);
            
            if (promises.length === results.length) {
                // Artist
                let keys = Object.keys(results[0]);
                let k = keys[Math.floor(Math.random() * keys.length)];
                let elem = results[0][k];
                
                //setArtist(elem);
                const wa = await getWeeksArtist();
                changeWeeksArtist(wa);
            
                // Playlist
                keys = Object.keys(results[1]);
                k = keys[Math.floor(Math.random() * keys.length)];
                elem = results[1][k];

                //setPlaylist(elem);
            }
        };
        const getDefaultLanguage = () => {
            const lang = params.lang || 'ES';

            if (lang !== language.toLowerCase()) {
                changeLanguage(lang);
            }
        };

        document.addEventListener('click', () => {
            window.localStorage.setItem('isFirstVisit', isFirstVisit);
            setIsFirstVisit(isFirstVisit);
        }, {once: true});

        fetchData();
        getDefaultLanguage();
    }, []);

    return (
        <section 
            id="land" 
            className={`text-center ${isFirstVisit? 'open' : 'close'}`}
            tabIndex="0"
        >
            <div className="land-container">
                <button
                    type="button"
                    className="but-close"
                    aria-label={text['close']}
                    onClick={() => {changeIsClosedRight(true); togglePanel();}}
                >
                    <FaRegWindowClose/>
                </button>
                <h2>{text['title-1']}</h2>
                <hr/>
                <h3>{text['subtitle-1']}</h3>
                <p>
                    {text['p-1']}&nbsp;
                    {artist && 
                        <RTLink type="article" cl="artists" data={{href: artist.href}}>
                            {artist.name}
                        </RTLink>
                    }
                </p>
                &nbsp;
                <h3>{text['subtitle-2']}</h3>
                <p>
                    {text['p-2']}&nbsp;
                    {playlist && 
                        <RTLink type="article" cl="playlists" data={{href: playlist.href}}>
                            {playlist.name}
                        </RTLink>
                    }
                </p>
            </div>
        </section>
    );
};

export default Component;