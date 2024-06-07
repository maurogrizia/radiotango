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
        //let msg = 'Free, online tango radio and blog - Radio Tango';
        let msg = 'Radio y blog de tango online gratis - Radio Tango';
        let link = 'https://radiotango.net.ar/';

        if (!isClosedRight) {
            if (isPlaying) {
                msg = `Escuchando ${player.song}, por ${player.artist} en Radio Tango!`;
            } else {
                msg = `Leyendo ${contentRight.title} en Radio Tango!`;
            }
        }

        return `${msg}\n\n${link}`;
    }

    const msg = getSocialMediaMsg();
    const encodedMsg = encodeURIComponent(msg);
    
    return (
        <>
        <div className={`container-socials${isClosedRight? '' : ' open'}`}>
            <div className={`menu-toggle ${showSocials? 'open' : ''}`} onClick={togglemenus}>
                <FaShareNodes className="toggle"/>
            </div>
            
            <div className={`menu-round ${showSocials? 'open' : ''}`}>
                <a href={`https://twitter.com/intent/tweet?text=${encodedMsg}`} target='_blank'>
                    <div className="btn-app">
                        <FaXTwitter/>
                    </div>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedMsg}`} target='_blank'>
                    <div className="btn-app">
                        <FaFacebook/>
                    </div>
                </a>
                <a href={`https://threads.net/intent/post?text=${encodedMsg}`} target='_blank'>
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
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedMsg}`} target='_blank'>
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
                <a href="https://www.instagram.com/maurogrizia" target='_blank'>
                    <div className="btn-app">
                        <FaInstagram/>
                    </div>
                </a>
            </div>*/
};

export default Social;