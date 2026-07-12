import {    //useEffect, 
            useState }           from "react";
import      axios                from 'axios';
import      ContentContext       from "./Context";
import      * as Pages           from "pages/index";

const ContextProvider = ({ children }) => {
    //const defaultArtist = {title: 'Artista de la semana', playlist: [], body: <></>};
    const defaultGlosary = {
        artists: {},
        posts: {},
        genres: {},
        pages: {},
        playlists: {}
    };
    const defaultCL = {
        href: '???',
        title: '???',
        body: null
    };
    const defaultCR = {
        urls: {
            meta: '',
            html: {
                es: null,
                en: null
            }
        },
        meta: {
            href: '',
            title: '',
            playlist: [],
            icons: []
        },
        html: {
            es: null,
            en: null
        }
    };

    const strDefaultPlayer = window.localStorage.getItem('player');
    const defaultPlayer = strDefaultPlayer? JSON.parse(strDefaultPlayer) : {artist: 'Destiny Quartet', song: 'El Choclo', yt: 'zcZeaUZve88', idx: 0};
    const [player, setPlayer] = useState(defaultPlayer);
    
    const [glosary, setGlosary] = useState(defaultGlosary);
    
    const [isError, setIsError] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const [contentLeft, setContentLeft] = useState(defaultCL);
    const [contentRight, setContentRight] = useState(defaultCR);
    const [isAutoplay, setIsAutoplay] = useState(0);
    const [isClosedLeft, setIsClosedLeft] = useState(true);
    const [isClosedRight, setIsClosedRight] = useState(true);
    const [isLoadingContentRight, setIsLoadingContentRight] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [weeksArtist, setWeeksArtist] = useState();
    
    const defaults = {
        lang: 'es',
        cl: 'artists',
        cr: weeksArtist
    };

    const fetchURLs = async (cl, cr) => {
        cr = cr.toLowerCase();
        try {
            const response = await axios.get(`/api/${cl}/${cr}`);
            //const urls = response.data;
            //const newState = {...glosary};

            //newState[cl][cr] = {urls};
            //setGlosary(newState);

            return response;
        } catch (e) {
            console.log(e.message);
        }
    };

    /*useEffect(() => {
        // Fetch as default week's artist
        fetchURLs('artists', weeksArtist);
    }, []);*/

    const removeNoAnimateClass = () => {
        const classPreload = 'preload-prevent-animation';
        const preloads = document.querySelectorAll(`.${classPreload}`);
    
        preloads.forEach((preload) => {
            preload.classList.remove(classPreload);
        });
    };

    // Darken Background image when opening panels for readability
    const changeBackground = (isCL, isCR) => {
        const body = document.querySelector('body');

        if (isCL && isCR) {
            body.classList.remove('bg-hide');
        } else {
            body.classList.add('bg-hide');
        }
    };

    const changeIsClosedLeft = isClosed => {
        setIsClosedLeft(isClosed);
        if (!isAnimated) {
            removeNoAnimateClass();
            setIsAnimated(true);
        }
        changeBackground(isClosed, isClosedRight);
    };
    const changeIsClosedRight = isClosed => {
        setIsClosedRight(isClosed);
        if (!isAnimated) {
            removeNoAnimateClass();
            setIsAnimated(true);
        }
        changeBackground(isClosedLeft, isClosed);
    };

    const provider = {
        player,
        contentLeft,
        contentRight,
        isAutoplay,
        isClosedLeft,
        isClosedRight,
        isLoadingContentRight,
        isError,
        isPlaying,
        showCanvas,
        weeksArtist,
        changePlayer: song => {
            if (isAutoplay === 0) {
                setIsAutoplay(1);
            }
            setPlayer(song);
            //window.localStorage.setItem('player', JSON.stringify(newPlayer));
        },
        changeContentLeft: cl => {
            const idx = cl[0].toUpperCase() + cl.slice(1, cl.length).toLowerCase();
            const content = Pages[idx];
            
            if (content) {
                const newContent = {...Pages[idx].default};
                
                if (contentLeft.href !== newContent.href) {
                    setContentLeft(newContent);
                }
                if (isClosedLeft || contentLeft.href === newContent.href) {
                    changeIsClosedLeft(!isClosedLeft);
                }
                if (!isAnimated) {
                    removeNoAnimateClass();
                    setIsAnimated(true);
                }
            } else {
                // else: show error toast with not-found
                const newContent = {...Pages["Error"].default};
                setIsError(true);
                setContentLeft(newContent);
                setIsClosedLeft(false);
            }
        },
        changeContentRight: async (lang, cl, cr) => {
            setIsLoadingContentRight(true);
            try {
                lang = lang? lang.toLowerCase() : defaults.lang;
                cl = cl? cl.toLowerCase() : defaults.cl;
                cr = cr? cr.toLowerCase() : defaults.cr;

                const newContent = {...glosary[cl][cr]};
                const isNewContent = true //contentRight.meta.href !== cr;

                let isUpdated = false;
                cr = cr === 'star'? weeksArtist : cr;

                // Update glosary
                if (isNewContent && (!newContent || !newContent['html'] || !newContent['html'][lang])) {
                    const promises = [];

                    // Fetch file urls
                    if (!newContent['urls']) {
                        const response = await fetchURLs(cl, cr);

                        newContent['urls'] = {...response.data};
                        isUpdated = true;
                    }

                    // Fetch files from storage
                    // urls already set on local newContent (I may need to set them on state)
                    if (!newContent['meta']) {
                        promises.push(axios.get(newContent['urls']['meta']));
                        isUpdated = true;
                    }

                    if (!newContent['html'] || !newContent['html'][lang]) {
                        promises.push(axios.get(newContent['urls']['html'][lang]));
                        isUpdated = true;
                    }

                    const responses = await Promise.all(promises);

                    if (isUpdated && responses.length === promises.length) {
                        const newState = {...glosary};

                        newContent['meta'] = !newContent['meta']? responses[0].data : newContent['meta'];
                        newContent['html'] = newContent['html']? newContent['html'] : {es: '', en: ''};
                        newContent['html'][lang] = responses[1]? responses[1].data : responses[0].data;
                        newState[cl][cr] = newContent;
                        setGlosary(newState);
                    } else {
                        // show error toast with not-found or general error
                        console.log('Error catching data: not found');
                        return;
                    }
                }

                // Update state
                if (cl === 'star') {
                    newContent.title = 'Artista de la semana';
                }

                setContentRight(newContent);
                if (!isAnimated) {
                    removeNoAnimateClass();
                    setIsAnimated(true);
                }
            } finally {
                setIsLoadingContentRight(false);
            }
        },
        changeIsClosedLeft,
        changeIsClosedRight,
        changeIsError: err => {
            setIsError(err);
        },
        changeIsPlaying: ip => {
            setIsPlaying(ip);
        },
        changeShowCanvas: showCanvas => {
            setShowCanvas(showCanvas);
        },
        changeWeeksArtist: artist => {
            setWeeksArtist(artist);
        },
    };

    return (
        <ContentContext.Provider value={provider}>
            {children}
        </ContentContext.Provider>
    );
};

export default ContextProvider;