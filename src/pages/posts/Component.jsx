import {    useContext,
            useState, 
            useRef, 
            useEffect }         from 'react';
import {    Link,
            useLocation }       from 'react-router-dom';
import {    FaSearch,
            FaTimes }           from 'react-icons/fa';

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
    const location = useLocation();
    const { language } = useContext(LanguageContext);

    const [search, setSearch] = useState('');
    const [artists, setPosts] = useState([]);
    const values = Object.values(artists);
    const filtered = search === ''? values : values.filter((x) => {return x.name.toLowerCase().includes(search)});
    const ordered = filtered.sort((a,b) => b.date.seconds - a.date.seconds);
    const activeHref = location.pathname.split('/').filter(Boolean).pop();

    lang = language;
    text = dictionary[lang];

    const formatDate = (date) => {
        const d = new Date(date.seconds * 1000);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return lang === 'EN'? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getPosts();
            
            setPosts(collection);
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
                id="fc-posts"
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
                            active={href === activeHref}
                        >
                            <span className="post-title">{label}</span>
                            <span className="post-date">{formatDate(artist.date)}</span>
                        </ListGroup.Item>
                    </Link>
                );
            })}
        </ListGroup>
        </div>
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