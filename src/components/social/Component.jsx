import {    useState, 
            useContext }        from 'react';

import      ContentContext      from 'context/content/Context';
import      LanguageContext     from 'context/language/Context';
import      { trackEvent }      from 'utils/analytics';

import {    FaShareNodes,
            FaFacebook,
            //FaYoutube,
            //FaInstagram,
            //FaSpotify,
            //FaSoundcloud,
            FaXTwitter,
            FaThreads }         from 'react-icons/fa6';

import      * as dictionary   	from './lang/index.js';

import "./styles.css";

let lang = 'ES';
let text = dictionary[lang];

const Social = () => {
    const { contentRight, 
            isClosedRight, 
            isPlaying, 
            player } = useContext(ContentContext);
    const { language } = useContext(LanguageContext);
    const [showSocials, setShowSocials] = useState(false);

    lang = language;
    text = dictionary[lang];
    
    const togglemenus = () => {
        setShowSocials(showSocials => {return !showSocials;})
    };
    const getSocialMediaMsg = () => {
        const link = 'https://radiotango.net.ar/';
        //const picture = 'https://radiotango.net.ar/background-original.webp';

        let text = 'Radio y blog de tango online gratis - Radio Tango';
        
        if (!isClosedRight) {
            if (isPlaying) {
                text = language === "ES"
                        ? `Escuchando ${player.song}, por ${player.artist} en Radio Tango!`
                        : `Listening to ${player.song}, by ${player.artist} on Radio Tango!`;
            } else {
                text = language === "ES"
                        ? `Leyendo ${contentRight.meta.title} en Radio Tango!`
                        : `Reading ${contentRight.meta.title} on Radio Tango!`;
            }
        }
        const encodedMsg = encodeURIComponent(`${text}\n\n${link}`);

        return {
            fb: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
            th: `https://threads.net/intent/post?text=${encodedMsg}`,
            tw: `https://x.com/intent/tweet?text=${encodedMsg}`,
        };
    }

    const urls = getSocialMediaMsg();
    
    return (
        <>
        <div className={`container-socials${isClosedRight? '' : ' open'}`}>
            <button
                type="button"
                className={`menu-toggle ${showSocials? 'open' : ''}`}
                onClick={togglemenus}
                aria-label={text['al-toggle']}
                aria-expanded={showSocials}
            >
                <FaShareNodes className="toggle"/>
            </button>
            
            <div className={`menu-round ${showSocials? 'open' : ''}`}>
                <a target="_blank" rel="noreferrer" href={urls.tw} aria-label={text['al-tt']} onClick={() => trackEvent('share_click', { platform: 'twitter' })}>
                    <div className="btn-app">
                        <FaXTwitter/>
                    </div>
                </a>
                <a target="_blank" rel="noreferrer" href={urls.fb} aria-label={text['al-fb']} onClick={() => trackEvent('share_click', { platform: 'facebook' })}>
                    <div className="btn-app">
                        <FaFacebook/>
                    </div>
                </a>
                <a target="_blank" rel="noreferrer" href={urls.th} aria-label={text['al-th']} onClick={() => trackEvent('share_click', { platform: 'threads' })}>
                    <div className="btn-app">
                        <FaThreads/>
                    </div>
                </a>
            </div>
            
        </div>
        </>
    );

    // Vertical line with more social media
    /*<div className={`menu-line ${showSocials? 'open' : ''}`}>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedMsg}`}>
                    <div className="btn-app">
                        <FaYoutube/>
                    </div>
                </a>
                <a>
                    <div className="btn-app">
                        <FaSoundcloud/>
                    </div>
                </a>
                <a>
                    <div className="btn-app">
                        <FaSpotify/>
                    </div>
                </a>
                <a href="https://www.instagram.com/maurogrizia">
                    <div className="btn-app">
                        <FaInstagram/>
                    </div>
                </a>
            </div>*/
};

export default Social;