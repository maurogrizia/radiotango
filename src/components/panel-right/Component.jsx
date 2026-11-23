import {  	useContext,
          	useEffect,
          	useRef,
          	useState,
			lazy }        		from 'react';

import {  	Button, 
          	Card, 
          	ListGroup }       	from 'react-bootstrap';
import {  	FaRegWindowClose,
			FaCaretUp,
			FaCaretDown,
			FaVolumeUp,
			FaYoutube,
			FaSpotify,
			FaSoundcloud,
			FaWikipediaW,
			FaInstagram,
			FaGlobeAmericas,
			FaFacebook,
			FaTwitter }        	from 'react-icons/fa';
import {  	Tooltip }         	from 'react-tooltip';
import 		ReactLoading 		from 'react-loading';
import { 	useNavigate,
			useLocation }		from 'react-router-dom';
import { 	Helmet }			from 'react-helmet-async';

// Use only for user-generated content
//import 		DOMPurify 			from 'dompurify';
const 		YouTube = lazy(() => import('react-youtube'));
//import    	YouTube           	from 'react-youtube';

import    	ContentContext    	from 'context/content/Context';
import    	LanguageContext   	from 'context/language/Context';
import      * as dictionary   	from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const SITE_URL = 'https://radiotango.net.ar';

const JSON_LD_TYPE_BY_CL = {
	artists: 'MusicGroup',
	posts: 'Article',
	playlists: 'MusicPlaylist',
};

const stripHtml = (html) => html
	? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
	: '';

// meta.json a veces trae URLs de redes sociales sin protocolo (ej. "www.facebook.com/x").
// Sin esto, el navegador (y Googlebot) las trata como rutas internas relativas y arma URLs
// rotas como /ES/artists/www.facebook.com/x, que Search Console reporta como rastreadas sin indexar.
const withProtocol = (url) => /^https?:\/\//i.test(url) ? url : `https://${url}`;

const PanelRight = (props) => {
	const { 	isClosedRight,
				contentRight,
				isErrorRight,
				player,
				isLoadingContentRight,
				changeIsClosedRight,
				changeIsPlaying,
				changePlayer,
				isAutoplay } = useContext(ContentContext);
  	const { 	language } = useContext(LanguageContext);
	const 		navigate 			= useNavigate();
	const 		location 			= useLocation();

	const [isClosedUp, setIsClosedUp] = useState(true);
	//const [contentWithAds, setContentWithAds] = useState('');

	const titleRef = useRef(null);
	const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

	lang = language;
    text = dictionary[lang];

	const togglePanel = () => {
		const panel = document.querySelector('#panel-right');

		if (panel.classList.contains('open')) {
			panel.classList.remove('open');
			panel.classList.add('close');
		} else {
			panel.classList.remove('close');
			panel.classList.add('open');
		}
  	};

	const toggleButton = () => {
		const butClose = document.querySelector('#but-slide-panel');
		const panel = document.querySelector('#panel-right');

		if (panel.classList.contains('open')) {
			butClose.textContent = '>';
			butClose.dataset['tooltipContent'] = text['tt-close'];
			butClose.classList.remove('close');
			butClose.classList.add('open');
		} else {
			butClose.textContent = '<';
			butClose.dataset['tooltipContent'] = text['tt-open'];
			butClose.classList.remove('open');
			butClose.classList.add('close');
		}
	};

  	const toggleCard = () => {
		const cardFirst = document.querySelector('#panel-right .card-first .card-body');
		const cardSecond = document.querySelector('#panel-right .card-second');

		if (cardFirst.classList.contains('open')) {
			cardFirst.classList.remove('open');
			cardFirst.classList.add('close');

			cardSecond.classList.remove('close');
			cardSecond.classList.add('open');
			setIsClosedUp(false);
		} else {
			cardFirst.classList.remove('close');
			cardFirst.classList.add('open');

			cardSecond.classList.remove('open');
			cardSecond.classList.add('close');
			setIsClosedUp(true);
		}
	};

  	const toggleLI = (e) => {
		const target = e.currentTarget;
		const siblings = target.parentElement.childNodes;
		
		siblings.forEach((s) => {
			s.classList.remove('act');
		});
		target.classList.toggle('act');
  	};

  	const chooseSong = (instruction) => {
		const playlist = [...contentRight.meta.playlist];
		const chooseNewIdx = {
			next: (idx) => {
				let newIdx = (idx + 1) % playlist.length;

				while (playlist[newIdx].skipAutoPlay) {
					newIdx = newIdx + 1 % playlist.length;
				}
				
				return newIdx;
			},
			prev: (idx) => {
				let newIdx = (idx - 1 + playlist.length) % playlist.length;

				while (!playlist[newIdx].skipAutoPlay) {
					newIdx = (newIdx - 1 + playlist.length) % playlist.length;
				}

				return newIdx;
			},
			random: () => {
				return Math.floor(Math.random() * playlist.length);
			}
		};

		let newSong = instruction.song? instruction.song : null;
		
		if (!newSong) {
			const newIdx = chooseNewIdx[instruction.go](player.idx || 0);
			
			newSong = {...playlist[newIdx], idx: newIdx};
		} else {
			newSong.idx = parseInt(instruction.idx);
		}
		changePlayer(newSong);
	};

	useEffect(() => {
		// PATCH to improve mobile visuals
		let vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.onresize = () => {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
	}, []);
	useEffect(() => {
		const followLink = (e) => {
			const target = e.currentTarget;
			const followLinkFuncs = {
				song: ({idx}) => {
					const song = contentRight.meta.playlist[idx];

					chooseSong({song, idx})
				},
				article: ({href, cl}) => {
					navigate(`/${language}/${cl}/${href}`);
				}
			};
			const dataset = target.dataset;

			if (followLinkFuncs[dataset.type]) {
				followLinkFuncs[dataset.type]({...dataset});
			}
		};
		const handleClick = (e) => {
			const target = e.currentTarget;
			const dataset = target.dataset;

			followLink(e);
		
			const iconAbs = document.getElementById('icon-abs');
		
			if (dataset.type === 'song') {
				iconAbs.classList.add('show');
				setTimeout(() => {
					iconAbs.classList.remove('show');
				}, 2500);
			}
		};

		// Add all internal links to inside articles
		const rtLinks = document.querySelectorAll("rt-link");

		rtLinks.forEach((rtLink) => {
			rtLink.addEventListener('click', handleClick);
		});

		//const ads = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6994593250482261"crossorigin="anonymous"></script><ins class="adsbygoogle"style="display:block; text-align:center;"data-ad-layout="in-article"data-ad-format="fluid"data-ad-client="ca-pub-6994593250482261"data-ad-slot="9972403646"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;
		//const endString = '</p>';
	
		//const withAds = contentRight.html[language.toLowerCase()];
		/*if (withAds) {
			const idxFirstEnd = withAds.indexOf(endString) + endString.length;
			const idxSecondEnd = idxFirstEnd > endString.length? withAds.indexOf(endString, idxFirstEnd) + endString.length : -1;
			withAds = idxSecondEnd !== -1? `${withAds.substring(0, idxSecondEnd)}${ads}${withAds.substring(idxSecondEnd, withAds.length)}` : withAds;
			setContentWithAds(withAds);
		}*/
	}, [contentRight, contentRight.html]);

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
	}, [contentRight.meta, language]);

	const cl = location.pathname.split('/')[2];
	// Normalizamos el segmento de idioma a mayúsculas: react-router matchea /:lang sin importar
	// mayúsculas/minúsculas, así que sin esto "/en/..." y "/EN/..." generaban cada uno su propio
	// canonical autorreferenciado (duplicado sin canonical elegido en Search Console).
	const pathSegments = location.pathname.split('/');
	const restPath = pathSegments.slice(2).join('/');
	const langUpper = language.toUpperCase();
	const otherLang = langUpper === 'ES'? 'EN' : 'ES';
	const canonicalUrl = `${SITE_URL}/${langUpper}${restPath? `/${restPath}` : ''}`;
	// "star" no es contenido propio: es un atajo que redirige client-side al artista destacado
	// de la semana (rotativo). Search Console lo reportaba como "rastreada, sin indexar" porque
	// el crawl nunca ve contenido estable ahí.
	const isStarRoute = pathSegments[3] === 'star';
	const alternateUrl = `${SITE_URL}/${otherLang}${restPath? `/${restPath}` : ''}`;
	const pageDescription = stripHtml(contentRight.html?.[language.toLowerCase()]).slice(0, 155);
	const jsonLdType = JSON_LD_TYPE_BY_CL[cl];
	const jsonLd = jsonLdType && contentRight.meta?.title
		? {
			'@context': 'https://schema.org',
			'@type': jsonLdType,
			name: contentRight.meta.title,
			url: canonicalUrl,
			...(pageDescription && { description: pageDescription }),
		}
		: null;

	return (
		<>
		{isClosedRight
			? <Button 
				id="but-slide-panel"
				bg="primary"
				className="m-0 close"
				disabled={!contentRight.html || !contentRight.html[language.toLowerCase()] || contentRight.html[language.toLowerCase()].length === 0}
				data-tooltip-id="tt-slide-panel"
				data-tooltip-content={text['tt-open']}
				data-tooltip-place="left"
				onClick={() => {changeIsClosedRight(false); togglePanel(); toggleButton();}}
			>
				&lt;
			</Button>
		: <Button 
				id="but-slide-panel"
				bg="primary"
				className="m-0 open"
				data-tooltip-id="tt-slide-panel"
				data-tooltip-content={text['tt-close']}
				data-tooltip-place="left"
				onClick={() => {changeIsClosedRight(true); togglePanel(); toggleButton();}}
			>
				&gt;
			</Button>
		}
		<Tooltip id="tt-slide-panel" />

		{contentRight.meta && contentRight.html
		? <section id="panel-right" className={isClosedRight? "close" : "open"} inert={isClosedRight? "" : undefined}>
			<button
				type="button"
				className="but-close"
				aria-label={text['tt-close']}
				onClick={() => {changeIsClosedRight(true); togglePanel(); toggleButton();}}
			>
				<FaRegWindowClose/>
			</button>
			{!isErrorRight &&
				<Helmet>
					<title>{`${contentRight.meta.title} - Radio Tango`}</title>
					{pageDescription && <meta name="description" content={pageDescription} />}
					<link rel="canonical" href={canonicalUrl} />
					<link rel="alternate" hreflang={language.toLowerCase()} href={canonicalUrl} />
					<link rel="alternate" hreflang={otherLang.toLowerCase()} href={alternateUrl} />
					<link rel="alternate" hreflang="x-default" href={`${SITE_URL}/ES${restPath? `/${restPath}` : ''}`} />
					{isStarRoute && <meta name="robots" content="noindex, follow" />}
					<meta property="og:title" content={`${contentRight.meta.title} - Radio Tango`} />
					{pageDescription && <meta property="og:description" content={pageDescription} />}
					<meta property="og:url" content={canonicalUrl} />
					{jsonLd &&
						<script type="application/ld+json">
							{JSON.stringify(jsonLd)}
						</script>
					}
				</Helmet>
			}
			{props.content}

			{isLoadingContentRight &&
			<div className={`panel-right-link-loading ${isClosedRight? 'animate-in' : 'instant'}`}>
				<ReactLoading
					type={'bubbles'}
					color={'#DDDDDD'}
					height={80}
					width={80}
				/>
			</div>}
			
			{isErrorRight
			? <>
				<Card className="mb-0 card-first">
					<Card.Header>
						<h1>{text['error-title']}</h1>
					</Card.Header>
					<Card.Body className='open'>
						<p>{text['error-msg']}</p>
					</Card.Body>
				</Card>

				<Button
					id="but-playlist"
					className='m-0'
					disabled
				>
					<FaVolumeUp id="icon-abs"/>
					<FaCaretUp/>
					Playlist
				</Button>
			</>
			: <>
				<Card className="mb-0 card-first">
					<Card.Header>
						<h1
							ref={titleRef}
							data-tooltip-id={isTitleOverflowing? "tt-panel-right-title" : undefined}
							data-tooltip-content={isTitleOverflowing? contentRight.meta.title : undefined}
							data-tooltip-place="top"
						>
							{contentRight.meta.title}
						</h1>
					</Card.Header>
					<Card.Body className='open'>
						<div dangerouslySetInnerHTML={{__html: contentRight.html[language.toLowerCase()]}}></div>
						<div className="social-container">
							{contentRight.meta.icons && Object.entries(contentRight.meta.icons).map(([k, v]) => {
								const iconFuncs = {
									fb: () => {return <FaFacebook/>;},
									ig: () => {return <FaInstagram/>;},
									of: () => {return <FaGlobeAmericas/>;},
									sc: () => {return <FaSoundcloud/>;},
									sp: () => {return <FaSpotify/>;},
									tw: () => {return <FaTwitter/>;},
									yt: () => {return <FaYoutube/>;},
									wp: () => {return <FaWikipediaW/>;},
								};

								return (
									<a target="_blank" rel="noreferrer" href={withProtocol(v)} key={k}>
										{iconFuncs[k](v)}
									</a>);
							})}
						</div>
					</Card.Body>
				</Card>
				<Tooltip id="tt-panel-right-title" positionStrategy="fixed" style={{zIndex: 999}} />

				<Button
					id="but-playlist"
					className='m-0'
					onClick={toggleCard}
					disabled={!contentRight.meta.playlist || contentRight.meta.playlist.length === 0}
				>
					<FaVolumeUp id="icon-abs"/>
					{isClosedUp
						? <FaCaretUp/>
						: <FaCaretDown/>}
					Playlist
				</Button>

				<Card className="m-0 card-second close">
					<Card.Body>
					<ListGroup as="ol" numbered className="mb-2" variant="secondary">
						{contentRight.meta.playlist && contentRight.meta.playlist.map((song, idx) => {
							const label = `${song.artist} - ${song.song}`;

							return (
								<ListGroup.Item
									action
									className={song.artist === player.artist && song.song === player.song? "act" : ""}
									variant="secondary"
									key={label}
									onClick={(e) => {toggleLI(e); chooseSong({song, idx})}}
								>
									{label}
								</ListGroup.Item>
							);
						})}
					</ListGroup>

					{isClosedRight
					? null
					: <YouTube
						className="text-center"
						videoId={player.yt}
						title={`${player.artist} - ${player.song}`}
						onPlay={() => {changeIsPlaying(true)}}
						onPause={() => {changeIsPlaying(false)}}
						onEnd={() => {chooseSong({go: 'next'})}}
						opts={{width: "100%", height: "auto", host: 'https://www.youtube-nocookie.com', playerVars: {autoplay: isAutoplay, start: player.ytStart || 0, end: player.ytEnd || 0}}}
					/>}
					</Card.Body>
				</Card>
			</>}
		</section>
		: null}
		</>
	);
}

export default PanelRight;