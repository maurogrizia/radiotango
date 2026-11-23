import {
  useContext,
  useState,
  useRef,
  useEffect,
  Fragment
} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import {
  FaSearch,
  FaTimes
} from 'react-icons/fa';

import { getPlaylists } from 'utils/playlists';
import { isRecent } from 'utils/date';

import {
  Form,
  ListGroup
} from "react-bootstrap";

import LanguageContext from 'context/language/Context';
import * as dictionary from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const GENRE_ORDER = ['classic', 'nuevo', 'neo', 'modern', 'other'];

const Component = () => {
  const ref = useRef(null);
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  const [search, setSearch] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const values = Object.values(playlists);
  const filtered = search === '' ? values : values.filter((x) => { return x.name.toLowerCase().includes(search) });
  const ordered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  const activeHref = location.pathname.split('/').filter(Boolean).pop();
  const groups = ordered.reduce((acc, playlist) => {
    const genre = GENRE_ORDER.includes(playlist.genre) ? playlist.genre : 'other';

    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(playlist);

    return acc;
  }, {});

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
    <div className="search-page">
      <p>
        {text['p-1']}
      </p>
      <div className="search-box">
        <FaSearch />
        <Form.Control
          id="fc-playlists"
          autoFocus
          className="my-2"
          aria-label={text['search']}
          placeholder={text['search']}
          onChange={(e) => { setSearch(e.currentTarget.value.toLowerCase()) }}
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
            <FaTimes />
          </button>
        }
      </div>
      <ListGroup as="ul" variant="secondary">
        {GENRE_ORDER.filter((genre) => groups[genre]?.length > 0).map((genre) => (
          <Fragment key={`group-${genre}`}>
            <li className="list-group-heading">{text[`genre-${genre}`]}</li>
            {groups[genre].map((elem) => {
              const label = elem.name;
              const href = elem.href;

              return (
                <ListGroup.Item
                  action
                  variant="secondary"
                  key={label}
                  as="li"
                  data-href={href}
                  active={href === activeHref}
                >
                  <Link
                    className="nav-link"
                    to={`/${language}/playlists/${href}`}
                  >
                    {label}
                    {isRecent(elem.date) &&
                      <span className="pill-new">{text['new']}</span>
                    }
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
    ES: "Playlists especiales",
    EN: "Special Playlists"
  },
  description: {
    ES: "Playlists temáticas de tango, curadas por género y estilo.",
    EN: "Curated tango playlists, organized by genre and style."
  },
  href: 'playlists',
  body: <Component />
};

export default data;
