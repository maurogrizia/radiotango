import Link from 'components/link/Component';

import {
        FaYoutube,
        FaSpotify,
        FaWikipediaW,
        FaInstagram,
        FaFacebook,
        FaTwitter
        }          from "react-icons/fa";

const playlist = [
    {
        artist: 'Bajofondo',
        song: 'Perfume de naranjo en flor',
        yt: 'J2tFhJPPuzc',
    },
    {
        artist: 'Bajofondo ft. Gustavo Cerati',
        song: 'El Mareo',
        yt: 'FakWEAvZE4g'
    },
    {
        artist: 'Bajofondo',
        song: 'Pa\'Bailar',
        yt: 'riuF_Ur3unc',
    },
    {
        artist: 'Bajofondo',
        song: 'Pide Piso',
        yt: 'GnekEPW4Okg',
    },
    {
        artist: 'Bajofondo ft. Natalia Oreiro',
        song: 'Будем танцевать (Listo Pa\'Bailar)',
        yt: 'Mw5vAmxk3D4',
    },
    {
        artist: 'Bajofondo ft. Adriana Varela',
        song: 'Perfume',
        yt: 'JkHdZFMJJjs',
    },
    {
        artist: 'Bajofondo',
        song: 'Bailarín',
        yt: 'zgl8fGH-348',
    },
    {
        artist: 'Bajofondo',
        song: 'Montserrat',
        yt: 'TrCqTR4q-ZE',
    },
    {
        artist: 'Bajofondo',
        song: 'Exodo II',
        yt: 'T6nLVYhHC6c',
    },
    {
        artist: 'Bajofondo ft. Cuareim 1080',
        song: 'Solari Yacumenza',
        yt: 'dmff1rBeksY',
        ytStart: 13,
    },
    {
        artist: 'Bajofondo ft. Natalia Oreiro',
        song: 'Будем танцевать (Listo Pa\'Bailar)',
        yt: 'Mw5vAmxk3D4',
    },
];
const body = <article>
    <h2>Introducción</h2>
    <p>
        <b>Bajofondo</b> (antes conocido como <b>Bajofondo Tango Club</b>) es una banda de tango electrónico compuesta por los argentinos <b>Gustavo Santaolalla</b>, <b>Martín Ferres</b>, <b>Javier Casalla</b> y <b>Adrián Sosa</b> y los uruguayos <b>Luciano Supervielle</b>, <b>Verónica Loza</b>, <b>Gabriel Casacuberta</b> y <b>Juan Campodónico</b>.
    </p>
    <p>
        La idea del grupo nació en 2001, cuando Santaolalla, el ganador de 2 premios Oscar por su trabajo en las bandas sonoras de Secreto en la montaña y Babel, y Campodónico maquinaron un concepto nuevo: tomar la vida urbana rioplatense y darle color a través de la mezcla de elementos latinos y electrónicos. Un área un tanto familiar para Juan, ya que formó parte de Peyote Asesino, una banda que tomó el tango y la milonga y les agregó elementos de Hip-Hop.
    </p>
    <p>
        Fue entonces que se pusieron en contacto con el resto del grupo: el DJ Supervielle, el violinista Casalla, el bandoneonísta Ferres, el contrabajista Casacuberta y la VJ Loza.
    </p>

    <h2>Estilo</h2>
    <p>
        A pesar de haber iniciado bajo la etiqueta de <i>tango electrónico</i>, la banda siempre evitó ser encasillada con esa etiqueta e incursionó permanentemente en la experimentación de sonidos tomados distintos géneros, siempre recordando su identidad como <b>música urbana del Río de la Plata</b>.
    </p>
    <p>
        La multiculturalidad del grupo y a su vez los distintos trasfondos y experiencias de cada integrante han llevado a Bajofondo por caminos interesantes. Han encontrado su identidad a través de diversas influencias, tales como el <b>rock</b>, el <b>candombe</b>, la <b>milonga</b>, la <b>murga</b>, e incluso la <b>cumbia</b>.
        <br/>
        Según el compositor Santaolalla, el grupo es lo que es actualmente por la combinación entre lo argentino y lo uruguayo.
    </p>
    <blockquote>
        Somos hermanos muy parecidos, pero somos distintos y eso le da una riqueza energética a la música y a la banda que es única.
        (...)
        (El grupo) sería muy distinto si solo fuera de una nacionalidad.
    </blockquote>

    <h2>Éxito</h2>
    <p>
        La banda no tardó en encontrarse con el éxito. El 2002, ganaron un Grammy Latino por mejor grupo instrumental pop.
        <br/>
        Su primer disco tuvo una gran interacción entre las distintos instrumentos y voces involucradas. El disco incluye temas propios, canciones de autores como Jorge Drexler, y también clásicos como <Link type="song" data={{song: playlist[0], idx: 0}}>Naranjo en flor</Link>.
    </p>
    <p>
        Después de eso han publicado <b>otros 5 álbumes</b>, en los años 2004, 2007, 2011, 2013 y 2019. Han colaborado con artistas reconocidos como Gustavo Cerati, Julieta Venegas y Mala Rodríguez.
    </p>
    
    <p>
        En el 2007, al haber lanzad oal mercado su disco <i>Mar dulce</i>, con el que emprenden giras de presentaciones por todo el país y el extranjero. Participaron como invitados Gustavo Cerati en <Link type="song" data={{song: playlist[1], idx: 1}}>El Mareo</Link>, Mala Rodríguez, Elvis Costello y Nelly Furtado entre otros.
    </p>
    <p>
        Desde su creación, el colectivo se ha presentado en casi toda Europa y en Sudamérica adquiriendo un éxito rotundo. Así como el tango a principios del siglo pasado transmitió la cultura argentina al resto mundo, ahora es el momento de Bajofondo de transmitir las nuevas tendencias.
    </p>

    <div className="social-container">
        <a target="_blank" href="https://x.com/Bajofondo">
            <FaTwitter/>
        </a>
        <a target="_blank" href="https://www.youtube.com/channel/UCWwi5VplrUvFF6sOGC-DBdg">
            <FaYoutube/>
        </a>
        <a target="_blank" href="https://open.spotify.com/intl-es/artist/4Wk0MW9d5uu6WbAgRCuH4O">
            <FaSpotify/>
        </a>
        <a target="_blank" href="https://es.wikipedia.org/wiki/Bajofondo">
            <FaWikipediaW/>
        </a>
        <a target="_blank" href="https://www.instagram.com/bajofondo_oficial/">
            <FaInstagram/>
        </a>
        <a target="_blank" href="https://www.facebook.com/bajofondo">
            <FaFacebook/>
        </a>
    </div>
</article>;

const data = {
    title: 'Bajofondo',
    body,
    playlist,
    genre: 'electro'
};

export default data;