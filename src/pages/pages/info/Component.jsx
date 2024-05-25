import {
        FaFacebook,
        FaInstagram,
        FaXTwitter,
        FaThreads,
        FaMedium,
        FaTelegram,
        FaMessage,
}                   from 'react-icons/fa6';

import './styles.css';

const Component = () => {
    return (
        <>
        <h2>Creado por</h2>
        <h6>Mauro Grizia</h6>
        <div className="container-socials-inline">
            <a href="https://twitter.com/GriziaMauro" target='_blank'>
                <FaXTwitter/>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61553601988444" target='_blank'>
                <FaFacebook/>
            </a>
            <a href="https://www.instagram.com/maurogrizia" target='_blank'>
                <FaInstagram/>
            </a>
            <a href="https://www.threads.net/@maurogrizia" target='_blank'>
                <FaThreads/>
            </a>
            <a href="https://medium.com/@griziamauro" target='_blank'>
                <FaMedium />
            </a>
        </div>

        <h2>Contacto</h2>
        <p>
            Por cualquier crítica, elogio o sugerencias, no duden en mandar mensaje a:
        </p>
        <div className="container-socials-inline">
            <a href="tg://resolve?domain=supermaramau" target='_blank'>
                <FaTelegram />
            </a>
            <a href="mailto:griziamauro@gmail.com" target='_blank'>
                <FaMessage/>
            </a>
        </div>
        </>
    );
};

const data = {
    title: 'Sobre',
    body: <Component/>,
}

export default data;