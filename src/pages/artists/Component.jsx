import {    useContext,
            useState,
            useRef,
            useEffect,
            Fragment }          from 'react';
import {    Link,
            useLocation }       from 'react-router-dom';
import {    FaSearch,
            FaTimes }           from 'react-icons/fa';

import {    getArtists,
            getWeeksArtist }    from 'utils/artists';
import {    Form,
            ListGroup }         from "react-bootstrap";

import      LanguageContext     from 'context/language/Context';
import      ContentContext      from 'context/content/Context.jsx';
import      * as dictionary     from './lang/index.js';

import './styles.css';


let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
    const ref = useRef(null);
    const location = useLocation();
    const { language } = useContext(LanguageContext);
    const { changeWeeksArtist } = useContext(ContentContext);

    const [search, setSearch] = useState('');
    const [artists, setArtists] = useState([]);
    const values = Object.values(artists);
    const filtered = search === ''? values : values.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => a.name.localeCompare(b.name));
    const activeHref = location.pathname.split('/').filter(Boolean).pop();
    const groups = ordered.reduce((acc, artist) => {
        const letter = artist.name.charAt(0).toUpperCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

        if (!acc[letter]) {
            acc[letter] = [];
        }
        acc[letter].push(artist);

        return acc;
    }, {});

    lang = language;
    text = dictionary[lang];

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getArtists();
            
            setArtists(collection);
            const wa = getWeeksArtist();
            
            changeWeeksArtist(wa);
        };

        fetchData();
    }, []);

    return (
        <div className="search-page">
        <p>
            {text['p-1']}
        </p>
        <div className="search-box">
            <FaSearch/>
            <Form.Control
                id="fc-artists"
                autoFocus
                className="my-2"
                aria-label={text['search']}
                placeholder={text['search']}
                onChange={(e) => {
                    setSearch(e.currentTarget.value.toLowerCase())
                }}
                ref={ref}
            />
            {search !== '' &&
                <button
                    type="button"
                    className="but-clear-search"
                    aria-label="clear search"
                    onClick={() => {
                        setSearch('');
                        ref.current.value = '';
                        ref.current.focus();
                    }}
                >
                    <FaTimes/>
                </button>
            }
        </div>
        <ListGroup
            as="ul"
            variant="secondary"
        >
            {Object.entries(groups).map(([letter, group]) => (
                <Fragment key={`group-${letter}`}>
                    <li className="list-group-heading">{letter}</li>
                    {group.map((artist) => {
                        const label = artist.name;
                        const href = artist.href;

                        return (
                            <ListGroup.Item
                                action
                                as="li"
                                variant="secondary"
                                key={label}
                                data-href={href}
                                active={href === activeHref}
                            >
                                <Link
                                    className="nav-link"
                                    to={`/${language}/artists/${href}`}
                                >
                                    {label}
                                </Link>
                            </ListGroup.Item>
                        );
                    })}
                </Fragment>
            ))}
        </ListGroup>
        </div>
    );
};

const data = {
    title: {
        ES: "Artistas",
        EN: "Artists",
    },
    href: 'artists',
    body: <Component/>
};

export default data;