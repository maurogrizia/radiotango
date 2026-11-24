import { createContext } from 'react';

const ContentContext = createContext({
    player: null,
    contentLeft: null,
    contentRight: null,
    contentHistory: [],
    isClosedLeft: true,
    isClosedRight: true,
    isLoadingContentRight: false,
    isError: false,
    showCanvas: false,
    weeksArtist: null,
});

export default ContentContext;