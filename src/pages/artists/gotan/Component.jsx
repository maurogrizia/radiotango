import {
        FaGlobe,
        FaYoutube,
        FaSpotify,
        FaWikipediaW,
        FaInstagram,
        FaFacebook
        }          from "react-icons/fa";

const body = <article>
    <h2>Introducción</h2>
    <p>
        <b>Gotan Project</b> es una banda de neotango asentada en París, integrada por artistas internacionales de varios trasfondos: el suizo <b>Christoph H. Müller</b>, el francés <b>Philippe Cohen Solal</b> y el argentino <b>Eduardo Makaroff</b>.
    </p>
    <p>
        El nombre es un clásico juego de palabras argentino, conocido como vesre, que consiste en invertir el orden de las sílabas en una palabra. Así, la palabra "tango" se convierte en "gotán".
    </p>

    <h2>Estilo</h2>
    <p>
        Su combinación de <b>tango, jazz y electrónica</b> puede llamar mucho la atención, pero no debería. Su música es, además de una evolución natural del tango, una consecuencia natural del aporte de cada integrante, siendo Christoph ingeniero de audio, Philippe DJ y Makaroff autor y compositor.
    </p>
    <p>
        En su web oficial, escribe Gilles Peterson:
    </p>
    <blockquote>
        Gotan Project fue el primero en llevar con éxito lo tradicional y lo folclórico al espacio electrónico.
        <br/>
	    (...) Beats discretos, estados de ánimo reflexivos y atmósferas arraigadas en las polvorientas callejuelas de Buenos Aires y París, mezcladas con voces maravillosas como la de Cristina Vilallonga en 'Peligro' o Melingo bendiciendo 'Tu Misterio'.
    </blockquote>
    <p>
        La influencia de la cultura argentina sobre Eduardo Makaroff no pasa desapercibida. En su álbum del 2010 <b>Tango 3.0</b> se rinde homenaje a ciertos personajes argentinos como al autor Julio Cortázar a través de la lectura de su novela <i>Rayuela</i> sobre la canción del mismo nombre y Víctor Hugo Morales, el comentarista de fútbol, hace una aparición en su sencillo <i>La Gloria</i> narrando un partido de fútbol. Se puede escuchar claramente un ¡GOOOOO...!, que se espera que termine siendo un ¡GOL! y termina sorpresivamente transformándose en ¡GOOOOO...TÁN!
    </p>
    <p>
        El trío describe su música como cinemática, han trabajado previamente, no en conjunto, en películas.
        <br/>
        Tratan de expresar los sentimientos del tango a través de una mezcla entre el soundtrack y la atmósfera.
        <br/>
        La canción <b>De hombre a hombre</b>, de su disco Tango 3.0, es inspirado por David Lynch. 
    </p>

    <h2>Apariciones</h2>
    <p>
        La música del trío ha tenido una repercusión internacional inesperada, no solamente vendiendo miles de discos alrededor del mundo, sino también realizando apariciones en películas y series de televisión. Entre ellas:
    </p>
    <ul>
        <li>En la serie de televisión argentina <b>Los simuladores</b>. Se usa su versión de <i>Cité Tango</i> tanto en la presentación del programa como en los celulares de los protagonistas como ringtone.</li>
        <li>En la serie de televisión estadounidense <b>Nip/Tuck</b> se usa <i>Santa María del Buen Ayre</i> como soundtrack en el capítulo 15 de la temporada 3.</li>
        <li>En la película <b>Ocean's Twelve</b> se escucha la canción <i>El capitalismo foráneo</i>.</li>
    </ul>

    <p>
        Amarrados a su identidad como músicos, si bien son famosos, rechazan realizar trabajos que no representen su o sus ideales, por ejemplo, rechazan trabajos promocionando alcohol o cigarrilos (con excepción del Campari, aman el Campari).
    </p>
    <div className="social-container">
        <a href="https://www.gotanproject.com/" target="_blank">
            <FaGlobe/>
        </a>
        <a href="https://www.youtube.com/@GotanOfficial" target='_blank'>
            <FaYoutube/>
        </a>
        <a href="https://open.spotify.com/intl-es/artist/44ejFPE33H5aOInxNV2BFP" target="_blank">
            <FaSpotify/>
        </a>
        <a href="https://es.wikipedia.org/wiki/Gotan_Project" target="_blank">
            <FaWikipediaW/>
        </a>
        <a href="https://www.instagram.com/gotanprojectofficial" target="_blank">
            <FaInstagram/>
        </a>
        <a href="https://www.facebook.com/gotanprojectofficial/" target="_blank">
            <FaFacebook/>
        </a>
    </div>
</article>;

const data = {
    title: 'Gotan Project',
    body,
    playlist: [
        {
            artist: 'Gotan Project',
            song: 'Peligro',
            yt: 'EsYVPlFj6_s',
        },
        {
            artist: 'Gotan Project',
            song: 'Tu misterio',
            yt: 'Vr5x5slFCMg',
        },
        {
            artist: 'Gotan Project',
            song: 'Rayuela',
            yt: 'xHBeF1HlBsM',
        },
        {
            artist: 'Gotan Project',
            song: 'La Gloria',
            yt: 'jNZO7joN8ng',
        },
        {
            artist: 'Gotan Project',
            song: 'De Hombre a Hombre',
            yt: 'vCcKWOVC620',
        },
        {
            artist: 'Gotan Project',
            song: 'Cité Tango',
            yt: 'tNpbcQWgvAs',
        },
        {
            artist: 'Gotan Project',
            song: 'Santa Maria (Del Buen Ayre)',
            yt: 'bp55S6Wta4M',
        },
        {
            artist: 'Gotan Project',
            song: 'El Capitalismo Foráneo',
            yt: 'OXx3U0udjPo',
        },   
    ]
};

export default data;