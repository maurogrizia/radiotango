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
            <a target="_blank" href="https://twitter.com/GriziaMauro">
                <FaXTwitter/>
            </a>
            <a target="_blank" href="https://www.facebook.com/profile.php?id=61553601988444">
                <FaFacebook/>
            </a>
            <a target="_blank" href="https://www.instagram.com/maurogrizia">
                <FaInstagram/>
            </a>
            <a target="_blank" href="https://www.threads.net/@maurogrizia">
                <FaThreads/>
            </a>
            <a target="_blank" href="https://medium.com/@griziamauro">
                <FaMedium />
            </a>
        </div>

        <h2>Contacto</h2>
        <p>
            Por cualquier crítica, elogio o sugerencias, no duden en mandar mensaje a:
        </p>
        <div className="container-socials-inline">
            <a href="tg://resolve?domain=supermaramau">
                <FaTelegram />
            </a>
            <a href="mailto:griziamauro@gmail.com">
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