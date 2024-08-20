import {    useState, 
            useContext }        from 'react';

import      ContentContext      from 'context/content/Context';
import      LanguageContext     from 'context/language/Context';

import {    FaShareNodes,
            FaFacebook,
            //FaYoutube,
            //FaInstagram,
            //FaSpotify,
            //FaSoundcloud,
            FaXTwitter,
            FaThreads }         from 'react-icons/fa6';

import "./styles.css";

const Social = () => {
    const { contentRight, 
            isClosedRight, 
            isPlaying, 
            player } = useContext(ContentContext);
    const { language } = useContext(LanguageContext);
    const [showSocials, setShowSocials] = useState(false);

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
            tw: `https://twitter.com/intent/tweet?text=${encodedMsg}`,
        };
    }

    const urls = getSocialMediaMsg();
    
    return (
        <>
        <div className={`container-socials${isClosedRight? '' : ' open'}`}>
            <div className={`menu-toggle ${showSocials? 'open' : ''}`} onClick={togglemenus}>
                <FaShareNodes className="toggle"/>
            </div>
            
            <div className={`menu-round ${showSocials? 'open' : ''}`}>
                <a target="_blank" rel="noreferrer" href={urls.tw}>
                    <div className="btn-app">
                        <FaXTwitter/>
                    </div>
                </a>
                <a target="_blank" rel="noreferrer" href={urls.fb}>
                    <div className="btn-app">
                        <FaFacebook/>
                    </div>
                </a>
                <a target="_blank" rel="noreferrer" href={urls.th}>
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