import { 	useContext,
			useEffect,
			useRef,
			useState }    		from 'react';

import { 	Card }       		from 'react-bootstrap';
import { 	FaArrowLeft,
			FaRegWindowClose } 	from "react-icons/fa";
import { 	Tooltip }			from 'react-tooltip';
import { 	Helmet }			from 'react-helmet-async';
import { 	useLocation,
			useNavigate }		from 'react-router-dom';

import 		ContentContext     	from 'context/content/Context';
import 		LanguageContext     from 'context/language/Context';

import './styles.css';

const SITE_URL = 'https://radiotango.net.ar';

const PanelLeft = (props) => {
	const { contentLeft,
			contentHistory,
			isClosedLeft,
			changeIsClosedLeft,
			popContentHistory } = useContext(ContentContext);
	const { language } = useContext(LanguageContext);
	const location = useLocation();
	const navigate = useNavigate();

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
	
	// El último elemento del historial es el artículo abierto en el panel derecho; el botón
	// vuelve al anterior. Al navegar, changeContentRight no lo duplica porque ya queda último.
	const previousContent = contentHistory.length > 1? contentHistory[contentHistory.length - 2] : null;
	const backLabel = previousContent
		? `${language === 'EN'? 'Back to' : 'Volver a'} ${previousContent.title || previousContent.cr}`
		: '';

	const goBack = () => {
		if (!previousContent) return;

		popContentHistory();
		navigate(`/${language}/${previousContent.cl}/${previousContent.cr}`);
	};

	// Normalizamos el segmento de idioma a mayúsculas: react-router matchea /:lang sin importar
	// mayúsculas/minúsculas, así que sin esto "/en/..." y "/EN/..." generaban cada uno su propio
	// canonical autorreferenciado (duplicado sin canonical elegido en Search Console).
	const pathSegments = location.pathname.split('/');
	const restPath = pathSegments.slice(2).join('/');
	const langUpper = language.toUpperCase();
	const otherLang = langUpper === 'ES'? 'EN' : 'ES';
	const canonicalUrl = `${SITE_URL}/${langUpper}${restPath? `/${restPath}` : ''}`;
	const alternateUrl = `${SITE_URL}/${otherLang}${restPath? `/${restPath}` : ''}`;
	const pageTitle = contentLeft.title[language];
	const pageDescription = contentLeft.description?.[language];
	const jsonLd = contentLeft.href === 'home'
		? {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Radio Tango',
			url: SITE_URL,
			...(pageDescription && { description: pageDescription }),
		}
		: null;

	return (
		<section id="panel-left" className={isClosedLeft? "close" : "open"} inert={isClosedLeft? "" : undefined}>
			{contentLeft.href !== '???' &&
				<Helmet>
					<title>{`${pageTitle} - Radio Tango`}</title>
					{pageDescription && <meta name="description" content={pageDescription} />}
					<link rel="canonical" href={canonicalUrl} />
					<link rel="alternate" hreflang={language.toLowerCase()} href={canonicalUrl} />
					<link rel="alternate" hreflang={otherLang.toLowerCase()} href={alternateUrl} />
					<link rel="alternate" hreflang="x-default" href={`${SITE_URL}/ES${restPath? `/${restPath}` : ''}`} />
					<meta property="og:title" content={`${pageTitle} - Radio Tango`} />
					{pageDescription && <meta property="og:description" content={pageDescription} />}
					<meta property="og:url" content={canonicalUrl} />
					{contentLeft.noindex && <meta name="robots" content="noindex, follow" />}
					{jsonLd &&
						<script type="application/ld+json">
							{JSON.stringify(jsonLd)}
						</script>
					}
				</Helmet>
			}
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
					{previousContent &&
						<button
							type="button"
							className="but-back"
							aria-label={backLabel}
							data-tooltip-id="tt-panel-left-back"
							data-tooltip-content={backLabel}
							data-tooltip-place="bottom"
							onClick={goBack}
						>
							<FaArrowLeft/>
						</button>
					}
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
			<Tooltip id="tt-panel-left-back" positionStrategy="fixed" style={{zIndex: 999}} />
		</section>
	);
}

export default PanelLeft;