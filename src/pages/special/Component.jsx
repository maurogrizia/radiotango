import {    useContext, 
            useState, 
            useRef,
            useEffect }     from 'react';
import {    Link }          from 'react-router-dom';

import {    getPlaylists }  from 'utils/playlists';

import {    Form, 
            ListGroup }     from "react-bootstrap";

import      LanguageContext from 'context/language/Context';
import      * as dictionary from './lang/index.js';

let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
    const ref = useRef(null);
    const { language } = useContext(LanguageContext);

    const [search, setSearch] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const values = Object.values(playlists);
    const filtered = search === ''? values : values.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => {return a.date > b.date;});

    lang = language;
    text = dictionary[lang];
    
    useEffect(() => {
        const fetchData = async () => {
            const collection = await getPlaylists();
            
            setPlaylists(collection);
        };

        fetchData();
    }, []);

    return (
        <>
        <p>
            {text['p-1']}
        </p>
        <Form.Control
            id="fc-playlists"
            autoFocus
            className="my-2"
            onChange={(e) => {setSearch(e.currentTarget.value.toLowerCase())}}
            ref={ref}
        />
        <ListGroup as="ul" variant="secondary">
            {ordered.map((elem) => {
                const label = elem.name;
                const href = elem.href;

                return (
                    <Link
                        key={`link-${label}`}
                        className="nav-link" 
                        to={`/${language}/playlists/${href}`}
                    >
                        <ListGroup.Item
                            action
                            variant="secondary"
                            key={label}
                            as="li"
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
        ES: "Playlists especiales",
        EN: "Special Playlists"
    },
    href: 'playlists',
    body: <Component/>
};

export default data;