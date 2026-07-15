import {
  useContext,
  useRef
} from 'react';
import {
  FaHome,
  FaStar,
  //          FaMusic,
  FaMicrophone,
  //          FaShoppingCart,
  FaBlog,
  //          FaAtlas,
  FaExchangeAlt,
  FaPlayCircle,
  FaHandHoldingHeart,
  FaInfo
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import {
  Dropdown,
  Stack
} from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';

import ContentContext from 'context/content/Context';
import LanguageContext from 'context/language/Context';
import * as dictionary from './lang/index.js';

import './styles.css';


let lang = 'ES';
let text = dictionary[lang];

const BarLeft = () => {
  const { language } = useContext(LanguageContext);
  const { isLoadingContentRight } = useContext(ContentContext);
  const ref = useRef(null);

  lang = language;
  text = dictionary[lang];

  const stackLinkClassName = variant => ({ isActive }) =>
    `stack-link btn ${variant}` +
    (isActive ? " active" : "") +
    (isLoadingContentRight ? " disabled" : "");
  const disabledProps = isLoadingContentRight
    ? { 'aria-disabled': "true", tabIndex: -1 }
    : {};

  return (
    <nav className="stack-container">
      <Stack gap={2} className="col-md-5 mx-auto stack-left" style={{ justifyContent: "space-between" }}>
        <div className="stack-section text-center">
          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/home`}
            aria-label={text['al-home']}
            data-tooltip-id="tt-home"
            data-tooltip-content={text['tt-home']}
            data-tooltip-place="right"
          >
            <FaHome />
          </NavLink>
          <Tooltip id="tt-home" />

          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/artists`}
            aria-label={text['al-artist']}
            data-tooltip-id="tt-artist"
            data-tooltip-content={text['tt-artist']}
            data-tooltip-place="right"
          >
            <FaMicrophone />
          </NavLink>
          <Tooltip id="tt-artist" />

          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/posts`}
            aria-label={text['al-blog']}
            data-tooltip-id="tt-blog"
            data-tooltip-content={text['tt-blog']}
            data-tooltip-place="right"
          >
            <FaBlog />
          </NavLink>
          <Tooltip id="tt-blog" />

          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/playlists`}
            aria-label={text['al-playlist']}
            data-tooltip-id="tt-special"
            data-tooltip-content={text['tt-playlist']}
            data-tooltip-place="right"
          >
            <FaPlayCircle />
          </NavLink>
          <Tooltip id="tt-special" />
        </div>
        <div className="stack-section text-center" ref={ref}>
          <NavLink
            className={stackLinkClassName("btn-primary btn-star")}
            {...disabledProps}
            to={`/${language}/artists/star`}
            aria-label={text['al-star']}
            data-tooltip-id="tt-star"
            data-tooltip-content={text['tt-star']}
            data-tooltip-place="right"
          >
            <FaStar />
          </NavLink>
          <Tooltip id="tt-star" />
        </div>
        <div className="stack-section text-center">
          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/about`}
            aria-label={text['al-about']}
            data-tooltip-id="tt-info"
            data-tooltip-content={text['tt-about']}
            data-tooltip-place="right"
          >
            <FaInfo />
          </NavLink>
          <Tooltip id="tt-info" />

          <NavLink
            className={stackLinkClassName("btn-secondary")}
            {...disabledProps}
            to={`/${language}/mode`}
            aria-label={text['al-conf']}
            data-tooltip-id="tt-mode"
            data-tooltip-content={text['tt-conf']}
            data-tooltip-place="right"
          >
            <FaExchangeAlt />
          </NavLink>
          <Tooltip id="tt-mode" />

          <Dropdown className="container-donations" drop="end">
            <Dropdown.Toggle
              variant="success"
              aria-label={text['al-donations']}
              data-tooltip-id="tt-donations"
              data-tooltip-content={text['tt-donations']}
              data-tooltip-place="right"
            >
              <FaHandHoldingHeart />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-r0">
              <Dropdown.Item className="a-donation" href='https://cafecito.app/maurogrizia' rel='noopener' target='_blank' aria-label={text['al-cafecito']}>
                <img className="img-donation" srcSet='https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_6.png' alt={text['alt-cafecito']} />
              </Dropdown.Item>
              <Dropdown.Item className="a-donation" href='https://ko-fi.com/N4N3O2G9M' rel="noopener noreferrer" target='_blank' aria-label={text['al-kofi']}>
                <img className="img-donation" src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt={text['alt-kofi']} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Tooltip id="tt-donations" />
        </div>
      </Stack>
    </nav>
  );
}

export default BarLeft;
