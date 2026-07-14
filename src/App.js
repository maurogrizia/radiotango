import    	React				from 'react';
import {  	BrowserRouter, 
          	Route, 
          	Routes }			from 'react-router-dom';

import {  	ToastContainer }	from "react-toastify";

import    	ContentProvider		from 'context/content/Provider';
import    	LanguageProvider	from 'context/language/Provider';

import    	BarLeft				from 'components/bar-left/Component';
import    	BarRight			from 'components/bar-right/Component';
import    	PanelLeft			from 'components/panel-left/Component';
import    	PanelRight			from 'components/panel-right/Component';
import    	Player				from 'components/player/Component';
import    	Land				from 'pages/land/Component';

import		HandlerLeftPanel	from 'components/handler-left-panel/Component';
import		HandlerRightPanel	from 'components/handler-right-panel/Component';

import './index.css';
import './App.css';

const App = () => {
	return (
	<BrowserRouter>
		<LanguageProvider>
			<ContentProvider>
				<main>
					<Routes>
						<Route exact path="/" element={<Land/>}/>
						<Route exact path="/:lang" element={<Land/>}/>
						<Route exact path="/:lang/:cl" element={<HandlerLeftPanel/>}/>
						<Route exact path="/:lang/:cl/:cr" element={<HandlerRightPanel/>}/>
					</Routes>

					<BarLeft/>
					<PanelLeft/>

					<Player/>

					<BarRight/>
					<PanelRight/>
				</main>
				<ToastContainer />
			</ContentProvider>
		</LanguageProvider>
    </BrowserRouter> );
};

export default App;