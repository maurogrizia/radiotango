import {    FaFacebook,
            FaInstagram,
            FaXTwitter,
            FaThreads,
            FaMedium,
            FaTelegram,
            FaEnvelope }        from 'react-icons/fa6';

import      * as dictionary     from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
    return (
        <>
        <h2>{text["h2-1"]}</h2>
        <h6>Mauro Grizia</h6>
        <div className="container-socials-inline">
            <a target="_blank" rel="noreferrer" href="https://twitter.com/GriziaMauro">
                <FaXTwitter/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61553601988444">
                <FaFacebook/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/maurogrizia">
                <FaInstagram/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.threads.net/@maurogrizia">
                <FaThreads/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://medium.com/@griziamauro">
                <FaMedium />
            </a>
        </div>

        <h2>{text["h2-2"]}</h2>
        <p>
            {text["p-1"]}
        </p>
        <div className="container-socials-inline">
            <a href="tg://resolve?domain=supermaramau">
                <FaTelegram />
            </a>
            <a href="mailto:griziamauro@gmail.com">
                <FaEnvelope/>
            </a>
        </div>
        </>
    );
};

const data = {
    title: {
        ES: "Sobre",
        EN: "About"
    },
    href: 'about',
    body: <Component/>,
}

export default data;