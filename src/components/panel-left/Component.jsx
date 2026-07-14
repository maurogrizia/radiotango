import { 	useContext,
			useEffect,
			useRef,
			useState }    		from 'react';

import { 	Card }       		from 'react-bootstrap';
import { 	FaRegWindowClose } 	from "react-icons/fa";
import { 	Tooltip }			from 'react-tooltip';

import 		ContentContext     	from 'context/content/Context';
import 		LanguageContext     from 'context/language/Context';

import './styles.css';

const PanelLeft = (props) => {
	const { contentLeft,
			isClosedLeft,
			changeIsClosedLeft } = useContext(ContentContext);
	const { language } = useContext(LanguageContext);

	const titleRef = useRef(null);
	const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

	useEffect(() => {
		const el = titleRef.current;

		if (!el) return;

		const checkOverflow = () => {
			setIsTitleOverflowing(el.scrollWidth > el.clientWidth);
		};

		checkOverflow();

		const observer = new ResizeObserver(checkOverflow);
		observer.observe(el);

		return () => observer.disconnect();
	}, [contentLeft.title, language]);

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
		<section id="panel-left" className={isClosedLeft? "close" : "open"} inert={isClosedLeft? "" : undefined}>
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
					<h1
						ref={titleRef}
						data-tooltip-id={isTitleOverflowing? "tt-panel-left-title" : undefined}
						data-tooltip-content={isTitleOverflowing? contentLeft.title[language] : undefined}
						data-tooltip-place="top"
					>
						{contentLeft.title[language]}
					</h1>
				</Card.Header>
				<Card.Body className='open'>
					{contentLeft.body}
				</Card.Body>
			</Card>
			<Tooltip id="tt-panel-left-title" positionStrategy="fixed" style={{zIndex: 999}} />
		</section>
	);
}

export default PanelLeft;