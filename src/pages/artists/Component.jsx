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

import {
  getArtists,
  getWeeksArtist
} from 'utils/artists';
import { isRecent } from 'utils/date';
import {
  Form,
  ListGroup
} from "react-bootstrap";

import ToggleSwitch from 'components/toggle-switch/Component';
import LanguageContext from 'context/language/Context';
import ContentContext from 'context/content/Context.jsx';
import * as dictionary from './lang/index.js';

import './styles.css';


let lang = 'ES';
let text = dictionary[lang];

const GENRE_ORDER = ['classic', 'nuevo', 'neo', 'modern', 'other'];

const Component = () => {
  const ref = useRef(null);
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const { changeWeeksArtist } = useContext(ContentContext);

  const [search, setSearch] = useState('');
  const [artists, setArtists] = useState([]);
  const [groupByGenre, setGroupByGenre] = useState(false);
  const values = Object.values(artists);
  const filtered = search === '' ? values : values.filter((x) => { return x.name.toLowerCase().includes(search) });
  const ordered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  const activeHref = location.pathname.split('/').filter(Boolean).pop();

  lang = language;
  text = dictionary[lang];

  const groups = ordered.reduce((acc, artist) => {
    const key = groupByGenre
      ? (GENRE_ORDER.includes(artist.genre) ? artist.genre : 'other')
      : artist.name.charAt(0).toUpperCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(artist);

    return acc;
  }, {});
  const groupEntries = groupByGenre
    ? GENRE_ORDER.filter((genre) => groups[genre]?.length > 0).map((genre) => [text[`genre-${genre}`], groups[genre]])
    : Object.entries(groups);

  useEffect(() => {
    const fetchData = async () => {
      const collection = await getArtists();

      setArtists(collection);
      const wa = await getWeeksArtist();

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
        <FaSearch />
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
            <FaTimes />
          </button>
        }
      </div>
      <ToggleSwitch
        id="sw-group-genre"
        label={text['lbl-group-genre']}
        checked={groupByGenre}
        onChange={(e) => setGroupByGenre(e.currentTarget.checked)}
      />
      <ListGroup
        as="ul"
        variant="secondary"
      >
        {groupEntries.map(([heading, group]) => (
          <Fragment key={`group-${heading}`}>
            <li className="list-group-heading">{heading}</li>
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
                    {isRecent(artist.date) &&
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
    ES: "Artistas",
    EN: "Artists",
  },
  description: {
    ES: "Explorá el archivo de artistas de tango: orquestas, cantores y músicos clásicos y modernos.",
    EN: "Explore the tango artists archive: classic and modern orchestras, singers and musicians."
  },
  href: 'artists',
  body: <Component />
};

export default data;
