import {    useContext, 
            useEffect, 
            useState}           from 'react';
import {    useParams,
            useLocation,
            useNavigate }       from 'react-router-dom';
import {    getWeeksArtist }    from 'utils/artists';
import      ContentContext      from 'context/content/Context';
import      LanguageContext     from 'context/language/Context';
import      ReactLoading        from 'react-loading';

import "./styles.css";

const Component = () => {
    const { isError,
            isClosedRight,
            weeksArtist,
            changeContentRight,
            changeIsClosedRight,
            changeIsError,
            changeWeeksArtist } = useContext(ContentContext);
    const { language,
            changeLanguage } = useContext(LanguageContext);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const lang = params.lang.toUpperCase();
    const cl = params.cl.toLowerCase();
    const cr = params.cr.toLowerCase();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            if (isError) {
                navigate(`/${lang}/error`);
                changeIsError(false);
            }
            if (cr === 'star') {
                changeWeeksArtist('aureliano');
                if (!weeksArtist) {
                    const wa = await getWeeksArtist();
                    
                    changeWeeksArtist(wa);
                    navigate(`/${lang}/artists/${wa}`);
                } else {
                    navigate(`/${lang}/artists/${weeksArtist}`);
                }
            }
        }
        
        fetchData();
    }, []);

    useEffect(() => {
        changeIsClosedRight(false);
    }, [location]);

    useEffect(() => {
        if (lang !== language.toUpperCase()) {
            changeLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await changeContentRight(lang, cl, cr);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData();
    }, [lang, cr]);

    return <>
        {<div 
            id="panel-right-cover"
            className={isClosedRight? '' : 'animate'}
            style={{display: isLoading? 'block' : 'none'}}
        >
            <ReactLoading 
                className="loading"
                type={'bubbles'} 
                color={'#DDDDDD'} 
                height={"auto"} 
                width={"50%"} 
            />
        </div>}
    </>
}

export default Component;