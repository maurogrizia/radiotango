import {    useContext,
            useState, 
            useRef, 
            useEffect }         from 'react';
import {    Link }              from 'react-router-dom';

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
    const { language } = useContext(LanguageContext);
    const { changeWeeksArtist } = useContext(ContentContext);
    
    const [search, setSearch] = useState('');
    const [artists, setArtists] = useState([]);
    const values = Object.values(artists);
    const filtered = search === ''? values : values.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => {return a.name > b.name;});
    
    lang = language;
    text = dictionary[lang];

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getArtists();
            
            setArtists(collection);
            changeWeeksArtist(getWeeksArtist());
        };

        fetchData();
    }, []);

    return (
        <>
        <p>
            {text['p-1']}
        </p>
        <Form.Control
            id="fc-artists"
            autoFocus
            className="my-2"
            onChange={(e) => {
                setSearch(e.currentTarget.value.toLowerCase())
            }}
            ref={ref}
        />
        <ListGroup 
            as="ul" 
            variant="secondary"
        >
            {ordered.map((artist) => {
                const label = artist.name;
                const href = artist.href;
                
                return (
                    <Link
                        key={`link-${label}`}
                        className="nav-link" 
                        to={`/${language}/artists/${href}`}
                    >
                        <ListGroup.Item 
                            action 
                            as="li"
                            variant="secondary" 
                            key={label} 
                            data-href={href}
                        >
                            {label}
                        </ListGroup.Item>
                    </Link>
                );
            })}
        </ListGroup>
        </>
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