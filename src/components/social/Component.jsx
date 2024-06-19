import { useState, useContext }         from 'react';

import ContentContext     from 'context/content/Context';

import {    FaShareNodes,
            FaFacebook,
            FaYoutube,
            FaInstagram,
            FaSpotify,
            FaSoundcloud,
            FaXTwitter,
            FaThreads
}                           from 'react-icons/fa6';

import "./styles.css";

const Social = () => {
    const { contentRight, isClosedRight, isPlaying, player } = useContext(ContentContext);
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
                text = `Escuchando ${player.song.song}, por ${player.song.artist} en Radio Tango!`;
            } else {
                text = `Leyendo ${contentRight.title} en Radio Tango!`;
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
                <a target="_blank" href={urls.tw}>
                    <div className="btn-app">
                        <FaXTwitter/>
                    </div>
                </a>
                <a target="_blank" href={urls.fb}>
                    <div className="btn-app">
                        <FaFacebook/>
                    </div>
                </a>
                <a target="_blank" href={urls.th}>
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