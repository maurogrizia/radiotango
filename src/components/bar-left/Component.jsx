import {  useContext,
          useRef }    from 'react';

import {  FaHome, 
          FaStar,
//          FaMusic, 
          FaMicrophone,
//          FaShoppingCart,
          FaBlog,
//          FaAtlas, 
          FaExchangeAlt,
          FaPlayCircle, 
          FaInfo }    from "react-icons/fa";

import ContentContext from 'context/content/Context';

import {  Button,
          Stack }     from 'react-bootstrap';

import { Tooltip }    from 'react-tooltip';

import './styles.css';

const BarLeft = () => {
  const { changeContentLeft, changeContentRight } = useContext(ContentContext);

  const ref = useRef(null);

  // Generos
  /*

                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-genres"
                  data-tooltip-content="Géneros"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Genres');}}
                >
                  <FaMusic/>
                </Button>
                <Tooltip id="tt-genres" />
  */

  // Atlas
  // IDEA: Cuando se hace hover en algún post a estos términos que salten cartelitos con la descripción
  // Por ahí el atlas es innecesario
  /*<Button 
    variant="secondary"
    data-tooltip-id="tt-atlas"
    data-tooltip-content="Atlas"
    data-tooltip-place="right"
    onClick={() => {changeContentLeft('Atlas');}}
  >
    <FaAtlas/>
  </Button>
  <Tooltip id="tt-atlas" />*/

  return (
    <nav className="stack-container">
        <Stack gap={2} className="col-md-5 mx-auto stack-left" style={{justifyContent: "space-between"}}>
            <div className="stack-section text-center">
                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-home"
                  data-tooltip-content="Inicio"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Home');}}
                >
                  <FaHome/>
                </Button>
                <Tooltip id="tt-home" />

                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-artist"
                  data-tooltip-content="Artistas"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Artists');}}
                >
                  <FaMicrophone/>
                </Button>
                <Tooltip id="tt-artist" />

                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-blog"
                  data-tooltip-content="Blog"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Blog');}}
                >
                  <FaBlog/>
                </Button>
                <Tooltip id="tt-blog" />

                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-special"
                  data-tooltip-content="Special playlists"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Special');}}
                >
                  <FaPlayCircle/>
                </Button>
                <Tooltip id="tt-special" />
            </div>
            <div className="stack-section text-center" ref={ref}>
              <Button 
                className="btn-star"
                variant="primary"
                data-tooltip-id="tt-star"
                data-tooltip-content="Artista de la semana"
                data-tooltip-place="right"
                onClick={() => {changeContentRight('Star');}}
              >
                <FaStar/>
              </Button>
              <Tooltip id="tt-star" />
            </div>
            <div className="stack-section text-center">
                
                <Button
                  variant="secondary"
                  data-tooltip-id="tt-info"
                  data-tooltip-content="Sobre"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Info');}}
                >
                  <FaInfo/>
                </Button>
                <Tooltip id="tt-info" />

                <Button 
                  variant="secondary"
                  data-tooltip-id="tt-mode"
                  data-tooltip-content="Configuración"
                  data-tooltip-place="right"
                  onClick={() => {changeContentLeft('Mode');}}>
                  <FaExchangeAlt/>
                </Button>
                <Tooltip id="tt-mode" />
            </div>
            
        </Stack>
    </nav>
  );
}

export default BarLeft;