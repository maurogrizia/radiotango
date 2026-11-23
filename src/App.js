import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import { ToastContainer } from "react-toastify";

import ContentProvider from 'context/content/Provider';
import LanguageProvider from 'context/language/Provider';
import LanguageContext from 'context/language/Context';

import BarLeft from 'components/bar-left/Component';
import BarRight from 'components/bar-right/Component';
import PanelLeft from 'components/panel-left/Component';
import PanelRight from 'components/panel-right/Component';
import Player from 'components/player/Component';
import CookieConsent from 'components/cookie-consent/Component';
import Land from 'pages/land/Component';

import HandlerLeftPanel from 'components/handler-left-panel/Component';
import HandlerRightPanel from 'components/handler-right-panel/Component';

import './index.css';
import './App.css';

// <Navigate to> no interpola params de ruta (":lang" quedaría literal), así que el idioma
// para el fallback de error hay que leerlo del contexto en vez de pasarlo como string fijo.
const NotFoundRedirect = () => {
  const { language } = useContext(LanguageContext);

  return <Navigate to={`/${language}/error`} replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ContentProvider>
          <main>
            <Routes>
              <Route exact path="/" element={<Land />} />
              <Route exact path="/:lang" element={<Land />} />
              <Route exact path="/:lang/:cl" element={<HandlerLeftPanel />} />
              <Route exact path="/:lang/:cl/:cr" element={<HandlerRightPanel />} />
              <Route path="*" element={<NotFoundRedirect />} />
            </Routes>

            <BarLeft />
            <PanelLeft />

            <Player />

            <BarRight />
            <PanelRight />
          </main>
          <ToastContainer />
          <CookieConsent />
        </ContentProvider>
      </LanguageProvider>
    </BrowserRouter>);
};

export default App;
