import { useContext } from 'react';
import LanguageContext from 'context/language/Context';
import RTLink from "components/link/Component";
import * as dictionary from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
  const { language } = useContext(LanguageContext);

  lang = language;
  text = dictionary[lang];

  return (
    <div className="home-page">
      <h2>{text['h2-welcome']}</h2>
      <br />
      <h3>
        {text['h3-1']}
      </h3>
      <p>
        {text['p-1-1']}
      </p>
      <p>
        {text['p-1-2']}
      </p>

      <h3>
        {text['h3-2']}
      </h3>
      <p>
        {text['p-2-1']}
      </p>
      <p>
        {text['p-2-2-1']} <RTLink type="article" cl="artists" data={{ href: "villoldo" }}>Villoldo</RTLink> {text['p-2-2-2']} <RTLink type="article" cl="artists" data={{ href: "piazzolla" }}>Piazzolla</RTLink> {text['p-2-2-3']}
      </p>

      <h3>
        {text['h3-3']}
      </h3>
      <p>
        {text['p-3-1']}
      </p>
      <p>
        {text['p-3-2']}
      </p>
      <p>
        {text['p-3-3']}
      </p>
      <p>
        {text['p-3-4-1']}
        <br />
        {text['p-3-4-2']}
        <br />
        {text['p-3-4-3']}
        <br />
        {text['p-3-4-4']}
      </p>

      <h3>
        {text['h3-4']}
      </h3>
      <p>
        {text['p4-1']}
      </p>

      <h3>
        {text['h3-5']}
      </h3>
    </div>
  );
};

const data = {
  title: {
    ES: "Inicio",
    EN: "Home"
  },
  description: {
    ES: "Descubrí Radio Tango: escuchá tango clásico y moderno, conocé a los artistas y la historia del género.",
    EN: "Discover Radio Tango: listen to classic and modern tango, and learn about the artists and history of the genre."
  },
  href: 'home',
  body: <Component />
};

export default data;
