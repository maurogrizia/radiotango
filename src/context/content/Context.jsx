import { createContext } from 'react';

const ContentContext = createContext({
    player: null,
    contentLeft: null,
    contentRight: null,
    isClosedLeft: true,
    isClosedRight: true,
    isError: false,
    showCanvas: false,
    weeksArtist: null,
});

export default ContentContext;