import {
  useContext,
  useState
} from 'react';
import { Link } from 'react-router-dom';

import LanguageContext from 'context/language/Context';
import { updateConsent } from 'utils/analytics';
import * as dictionary from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const CookieConsent = () => {
  const { language } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(() => window.localStorage.getItem('cookieConsent') === null);

  lang = language;
  text = dictionary[lang];

  const handleChoice = (granted) => {
    window.localStorage.setItem('cookieConsent', granted ? 'granted' : 'denied');
    updateConsent(granted);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent-banner" role="region" aria-label={text['al-banner']}>
      <p>
        {text['msg']}&nbsp;
        <Link to={`/${language}/privacy`}>{text['more-info']}</Link>
      </p>
      <div className="cookie-consent-actions">
        <button type="button" className="btn btn-secondary" onClick={() => handleChoice(false)}>
          {text['reject']}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => handleChoice(true)}>
          {text['accept']}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
