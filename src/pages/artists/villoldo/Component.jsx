import Link from 'components/link/Component';

const playlist = [
    {
        artist: 'Orquesta Típica Buenos Aires',
        song: 'El Choclo',
        yt: 'I0Irc_WTvdY',
    },
    {
        artist: 'Tito Rivadeneira y elenco',
        song: '¡Cuidado con los cincuenta!',
        yt: 'LRgzmruFliI',
        ytStart: 38,
    },
    {
        artist: 'Alfredo Gobbi',
        song: 'El Porteñito',
        yt: 'MoUoY9OCQNg',
    },
    {
        artist: 'Alberto Rossi',
        song: 'El Esquinazo',
        yt: 'iIIxxwIrdLI',
    },
    {
        artist: 'Banda Municipal',
        song: 'La Budinera',
        yt: 'otEWb0fZI20',
    },
    {
        artist: 'Cuarteto del Centenario',
        song: 'Soy Tremendo',
        yt: 'rjWWkzrv3lk',
    },
    {
        artist: 'Carlos Gardel',
        song: 'Cantar Eterno',
        yt: 'wNTv1V2W0mU',
    },
    {
        artist: 'Enrique Saborido',
        song: 'La Morocha',
        yt: '72Oi-mZ_Phk',
    },
    {
        artist: 'Walter Yonsky · Cuarteto del Centenario',
        song: 'Matufias o el Arte de Vivir',
        yt: 'cdFvemrlXy8',
    },
    {
        artist: 'Daniel Binelli',
        song: 'Sácame una película, gordito',
        yt: 'a4JM1jXFuuU',
    },
    {
        artist: 'Tío Lavandina',
        song: 'Chiflale que va a venir',
        yt: '-pKwLzoYKL4',
    },
    {
        artist: 'Ángel Villoldo',
        song: 'El Negro Alegre',
        yt: 'sYeVQbWU2DU',
    },
    {
        artist: 'Orquesta Escuela de Tango',
        song: 'Cuidado con los 50 - Instrumental',
        yt: 'P37D06qGiNk',
    },
];
const body = <article>
    <h2>Introducci&oacute;n</h2>
    <p>
        <strong>&Aacute;ngel Gregorio Villoldo Arroyo</strong> naci&oacute; el 16 de febrero de 1861, en Barracas, Buenos Aires. Fue un compositor argentino, uno de los compositores m&aacute;s caracter&iacute;sticos de las primeras &eacute;pocas del tango. Se lo conoce como el gran transformador de los tanguillos espa&ntilde;oles, los cupl&eacute;s y las habaneras, convirtiendo esas en un estilo propiamente argentino.
    </p>
    <p>
        Fue un artista nato que no dej&oacute; de lado ninguna oportunidad que le dejara un sustento para vivir. Entre otros oficios fue tip&oacute;grafo, payaso de circo y cuarteador en los barrios alejados del centro de la ciudad. Estos m&uacute;ltiples oficios lo hicieron un conocedor de los barrios populares. Fue alguien que supo entender el sentimiento de la gente de los barrios bajos y transformarlo en canciones.
    </p>

    <h2>Estilo</h2>
    <p>
        En toda su obra est&aacute; presente la picard&iacute;a, y sus di&aacute;logos estaban pensados en boca del hombre com&uacute;n y siempre referidos a situaciones reales del barrio y muchas veces a cuestiones amorosas que retrataban la forma de hablar y comportarse del estrato social bajo de nuestra sociedad.
    </p>
    <p>
        Siempre acompa&ntilde;ado de su guitarra, con una arm&oacute;nica ajustada a una varilla por encima de la guitarra, que le permit&iacute;a tocar ambos instrumentos de forma simult&aacute;nea.
    </p>
    
    <h2>Obras</h2>
    <p>
        Los tangos compuestos por Villoldo son tangos-milonga, escritos en comp&aacute;s de dos por cuatro.
    </p>
    <p>
        Entre sus obras m&aacute;s representativas est&aacute;n:
    </p>

    <h4>El Choclo</h4>
    <p>
        <Link type="song" data={{song: playlist[0], idx: 0}}>El choclo</Link>, composici&oacute;n creada en el a&ntilde;o 1903, cuando todav&iacute;a en los locales elegantes o c&eacute;ntricos de Buenos Aires estaba prohibida la interpretaci&oacute;n de tangos. Junto a su amigo Jos&eacute; Luis Roncallo, director de una orquesta de m&uacute;sica en el Restaurante Americano, estrenaron esta obra como una danza criolla.</p>
    <p>
        Lograron su difusi&oacute;n masiva, tal as&iacute; que en 1916, durante la Primera Guerra Mundial, en un banquete en el frente alem&aacute;n, los m&uacute;sicos de la banda que ejecutaron los himnos de los pa&iacute;ses representados no ten&iacute;an la partitura correspondiente al himno argentino y terminaron tocando &quot;El choclo&quot; porque la conoc&iacute;an de memoria.</p>
    <p>
        Desde entonces, se han realizado m&uacute;ltiples y variadas interpretaciones de este tango en orquestas sinf&oacute;nicas, bandas militares y de jazz, en conjuntos andinos y de rock.</p>
    
    <h4>&iexcl;Cuidado con los cincuenta!</h4>
    <p>
        En julio de 1889 el jefe de Polic&iacute;a de Buenos Aires orden&oacute; <strong>reprimir con cincuenta pesos al que piropeara a una mujer en la calle</strong>. En esta &eacute;poca se dieron los inicios del tango, un estilo popular, incluso barriobajero, que se bailaba en las y en lugares de mala muerte, burdeles y tabernas sin lustre.<br/>
    <strong>Era m&uacute;sica sin letra y tocada de o&iacute;do</strong>, ya que los compositores no sol&iacute;an tener formaci&oacute;n musical. Los llamaban <em>orejeros</em>.<br/>
    Algunos artistas de la &eacute;poca se volvieron pioneros y experimentaron con agregarle letra a estas canciones. Uno de los primeros poetas del tango fue el mismo Villoldo.</p>
    <p>
        Tom&oacute; de los tanguillos y cupl&eacute;s espa&ntilde;oles la picard&iacute;a, el doble sentido y la chispa. Aprovech&oacute; la prohibici&oacute;n del piropo para componer <Link type="song" data={{song: playlist[1], idx: 1}}>&iexcl;Cuidado con los 50!</Link>, haciendo referencia a la cantidad de la multa:</p>
    <blockquote>
        Una ordenanza sobre la moral<br/>
        decret&oacute; la direcci&oacute;n policial<br/> 
        y por la que el hombre se debe abstener<br/>
        decir palabras dulces a una mujer.<br/>
        (...)<br/>
        Y con cuidado,<br/>
        que si se da cuenta,<br/>
        &iexcl;ay!, de los cincuenta<br/>
        no me salvar&eacute;.<br/>
    </blockquote>
    <p>
        Un amigo le aconsej&oacute; darle publicidad a esta obra saliendo a la calle a decirle un piropo a una mujer para ser multado con los cincuenta pesos. Eso, saliendo en losdiarios, ser&iacute;a una buena propaganda.<br/>
        <br/>
        Villoldo sigui&oacute; el consejo de su amigo pero ninguna de las mujeres piropeadas lo denunci&oacute;, por lo que se frustr&oacute; su estrategia comercial.<br/>
    </p>
    <hr/>
    <p>
        &Aacute;ngel tambi&eacute;n compuso valses, polcas y un variado repertorio folcl&oacute;rico. Algunas de sus obras son los tangos <Link type="song" data={{song: playlist[2], idx: 2}}>&ldquo;El Porte&ntilde;ito&rdquo;</Link>, <Link type="song" data={{song: playlist[3], idx: 3}}>&ldquo;El esquinazo&rdquo;</Link>, <Link type="song" data={{song: playlist[4], idx: 4}}>&ldquo;La budinera&rdquo;</Link>, <Link type="song" data={{song: playlist[5], idx: 5}}>&ldquo;Soy tremendo&rdquo;</Link> y <Link type="song" data={{song: playlist[6], idx: 6}}>&ldquo;Cantar eterno&rdquo;</Link>, este &uacute;ltimo grabado en 1917 por el d&uacute;o Gardel-Razzano.
    </p>
    <p>
        Otro tango es <Link type="song" data={{song: playlist[7], idx: 7}}>&ldquo;La morocha&rdquo;</Link>, de letra sencilla y hecha de apuro para su compositor Enrique Saborido, que en 1906 tuvo la fortuna de embarcar sus partituras en la Fragata Sarmiento, buque de instrucci&oacute;n de los cadetes de la Armada, y es considerado el primer tango que se difundi&oacute; en Europa.
    </p>
    
    <h3>Referencias</h3>
    <ol>
        <li>
            <a target="_blank" href="https://es.wikipedia.org/wiki/%C3%81ngel_Villoldo">
                Wikipedia: Ángel Villoldo
            </a>
        </li>
        <li>
            <a target="_blank" href="https://www.eldebate.com/historia/20221120/prohibicion-piropo_71380.html">
                El Debate: La prohibición del piropo no es nueva y las bromas que provoca tampoco
            </a>
        </li>
        <li>
            <a target="_blank" href="https://www.todotango.com/creadores/biografia/51/angel-Villoldo/">
                Todo Tango: Ángel Villoldo
            </a>
        </li>
    </ol>
</article>;

const data = {
    title: 'Ángel Villoldo',
    body,
    playlist,
    genre: 'classic',
};

export default data;