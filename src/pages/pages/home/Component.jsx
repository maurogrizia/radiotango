import { ListGroup } from "react-bootstrap";

import './styles.css';

const Component = () => {
    return (
        <>
        <h2>¡Bienvenido/a al apasionante mundo del tango!</h2>
        <br/>
        <h5>
            Sentí el ritmo, explorá la historia y descubrí la magia
        </h5>
        <p>
            En este espacio te invitamos a sumergirte en el universo del tango, un baile y una música que han cautivado al mundo entero con su pasión, elegancia y profunda expresión.
        </p>
        <p>
            Acá vas a poder disfrutar de la música mientras te informás sobre la historia de los distintos artistas y la historia del género en sí.
        </p>
        
        <h5>
            Navegá por nuestra amplia colección de playlists
        </h5>
        <p>
            Te ofrecemos una experiencia musical única, donde podrás disfrutar de una selección cuidadosamente curada de tangos clásicos y modernos.
        </p>
        <p>
            Vas a encontrarte con artistas referentes del género como Villoldo y Piazzolla, así como vas a descubrir artistas emergentes que le dan una vuelta de rosca y aportan nuevos sonidos.
        </p>
        
        <h5>
            Explorá por artistas, épocas y subgéneros
        </h5>
        <p>
            Sumergite en la rica historia del tango y descubrí a los grandes maestros que han dado forma a este arte.
        </p>
        <p>
            Desde el tango tradicional hasta las vanguardistas fusiones contemporáneas, acá vas a encontrar una amplia variedad de estilos para deleitarte.
        </p>
        <p>
            Vas a encontrar múltiples caminos para transitar el mismo sendero
        </p>
        <p>
            ¿Querés escuchar todo lo que ofrece cada artista individual?
            <br/>
            ¿Querés explorar cronológicamente la evolución del tango?
            <br/>
            ¿Querés descubrir distintos subgéneros?
            <br/>
            Hay algo para todos los gustos.
        </p>

        <h5>
            Preparate para ser cautivado
        </h5>
        <p>
            Dejá que el ritmo te envuelva, emocionate al descubrir los secretos detrás de cada letra y descubrí el encanto que ha hecho del tango un ícono cultural a nivel mundial.
        </p>

        <h5>
            ¡Empezá tu viaje musical ahora mismo!
        </h5>
        </>
    );
};

const data = {
    title: 'Inicio',
    body: <Component/>
};

export default data;