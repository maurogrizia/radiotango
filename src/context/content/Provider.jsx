import React, { useState }  from "react";

import ContentContext       from "./Context";
import * as Posts           from "pages/posts/index";
import * as Genres          from "pages/genres/index";
import * as Artists         from "pages/artists/index";
import * as Pages           from "pages/pages/index";

const ContextProvider = ({ children }) => {
    const weeksArtist = 'Sciammarella';//'Piazzolla';
    const defaultArtist = Artists[weeksArtist].default;
    const defaultPlaylist = defaultArtist.playlist;
    const defaultSong = defaultPlaylist[0];

    const strDefaultPlayer = window.localStorage.getItem('player');
    const defaultPlayer = strDefaultPlayer? JSON.parse(strDefaultPlayer) : defaultSong;
    const [player, setPlayer] = useState({...defaultPlayer, idx: 0});
    
    const [isAnimated, setIsAnimated] = useState(false);
    const [contentLeft, setContentLeft] = useState('Home');
    const [contentRight, setContentRight] = useState({...defaultArtist, title: 'Artista de la semana'});
    const [isAutoplay, setIsAutoplay] = useState(0);
    const [isClosedLeft, setIsClosedLeft] = useState(true);
    const [isClosedRight, setIsClosedRight] = useState(true);
    const [showCanvas, setShowCanvas] = useState(false);
    
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
        showCanvas,
        changePlayer: song => {
            if (isAutoplay === 0) {
                setIsAutoplay(1);
            }
            setPlayer(song);
            //window.localStorage.setItem('player', JSON.stringify(newPlayer));
        },
        changeContentLeft: cl => {
            const content = Pages[cl];

            if (content) {
                const newContent = {...Pages[cl].default};
                
                if (contentLeft.title !== newContent.title) {
                    setContentLeft(newContent);
                }
                if (isClosedLeft || contentLeft.title === newContent.title) {
                    changeIsClosedLeft(!isClosedLeft);
                }
                if (!isAnimated) {
                    removeNoAnimateClass();
                    setIsAnimated(true);
                }
            }
        },
        changeContentRight: cr => {
            const content = Posts[cr] || Genres[cr] || Artists[cr] || (cr === 'Star' && Artists[weeksArtist]);

            if (content) {
                const newContent = {...content.default};
                const isNewContent = contentRight.title !== newContent.title;
                
                if (isNewContent) {
                    if (cr === 'Star') {
                        newContent.title = 'Artista de la semana'
                    }
                    setContentRight(newContent);
                }
                if (isClosedRight || contentRight.title === newContent.title) {
                    changeIsClosedRight(!isClosedRight);
                }
                if (!isAnimated) {
                    removeNoAnimateClass();
                    setIsAnimated(true);
                }
            }
        },
        changeIsClosedLeft,
        changeIsClosedRight,
        changeShowCanvas: showCanvas => {
            setShowCanvas(showCanvas);
        }
    };

    return (
        <ContentContext.Provider value={provider}>
            {children}
        </ContentContext.Provider>
    );
};

export default ContextProvider;