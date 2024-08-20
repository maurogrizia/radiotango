import {    useContext,
            useState, 
            useRef, 
            useEffect }         from 'react';
import {    Link }              from 'react-router-dom';

import {    getPosts }          from 'utils/posts';
import {    Form, 
            ListGroup }         from "react-bootstrap";

import      LanguageContext     from 'context/language/Context';
import      * as dictionary     from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
    const ref = useRef(null);
    const { language } = useContext(LanguageContext);
    
    const [search, setSearch] = useState('');
    const [artists, setPosts] = useState([]);
    const values = Object.values(artists);
    const filtered = search === ''? values : values.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => {return a.name > b.name;});
    
    lang = language;
    text = dictionary[lang];

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getPosts();
            
            setPosts(collection);
        };
        
        fetchData();
    }, []);

    return (
        <>
        <p>
            {text['p-1']}
        </p>
        <Form.Control
            id="fc-posts"
            autoFocus
            className="my-2"
            onChange={(e) => {
                setSearch(e.currentTarget.value.toLowerCase())
            }}
            ref={ref}
        />
        <ListGroup as="ul" variant="secondary">
            {ordered.map((artist) => {
                const label = artist.name;
                const href = artist.href;
                
                return (
                    <Link
                        key={`link-${label}`}
                        className="nav-link" 
                        to={`/${language}/posts/${href}`}
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
        ES: "Posts",
        EN: "Posts"
    },
    href: 'posts',
    body: <Component/>
};

export default data;