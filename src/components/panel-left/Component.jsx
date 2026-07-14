import { 	useContext }    	from 'react';

import { 	Card }       		from 'react-bootstrap';
import { 	FaRegWindowClose } 	from "react-icons/fa";

import 		ContentContext     	from 'context/content/Context';
import 		LanguageContext     from 'context/language/Context';

import './styles.css';

const PanelLeft = (props) => {
	const { contentLeft, 
			isClosedLeft, 
			changeIsClosedLeft } = useContext(ContentContext);
	const { language } = useContext(LanguageContext);

	const togglePanel = () => {
		const panel = document.querySelector('#panel-left');
		
		if (panel.classList.contains('open')) {
			panel.classList.remove('open');
			panel.classList.add('close');
		} else {
			panel.classList.remove('close');
			panel.classList.add('open');
		}
	};
	
	return (
		<section id="panel-left" className={isClosedLeft? "close" : "open"}>
			<button
				type="button"
				className="but-close"
				aria-label={language === 'EN'? 'Close' : 'Cerrar'}
				onClick={() => {changeIsClosedLeft(true); togglePanel();}}
			>
				<FaRegWindowClose/>
			</button>
			
			{props.content}
			
			<Card className="mb-0 card-first">
				<Card.Header>
					<h1 title={contentLeft.title[language]}>
						{contentLeft.title[language]}
					</h1>
				</Card.Header>
				<Card.Body className='open'>
					{contentLeft.body}
				</Card.Body>
			</Card>
		</section>
	);
}

export default PanelLeft;