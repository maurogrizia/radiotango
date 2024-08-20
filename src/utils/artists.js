import axios                    from "axios";

import { getIsUpdateNeeded }    from './time';

let artists =   window.localStorage.getItem('artists')
                ? JSON.parse(window.localStorage.getItem('artists'))
                : {};

const getArtists = async () => {
    const itemLastUpdate = window.localStorage.getItem('lastUpdate')
        ? JSON.parse(window.localStorage.getItem('lastUpdate'))
        : {};
    const isUpdateNeeded = !itemLastUpdate.artists 
                        || getIsUpdateNeeded(itemLastUpdate);
    
    try {
        if (artists.length === 0 || isUpdateNeeded) {
            const response = await axios.get('/api/artists');
            
            artists = response.data;
            itemLastUpdate.artists = Date.now();
            window.localStorage.setItem('artists', JSON.stringify(response.data));
            window.localStorage.setItem('lastUpdate', JSON.stringify(itemLastUpdate));
            //console.log('artists update!')
        }
        
        return artists;
    } catch (e) {
        console.log(e.message);

        return [];
    }
};

const getWeeksArtist = () => {
    const entries = Object.entries(artists);

    let weeksArtist = entries[0]? entries[0][1].href : null;
    let done = false;

    for (let i = 1; i < entries.length && !done; i++) {
        if (entries[i][1].star === true) {
            weeksArtist = entries[i][0];
            done = true;
        }
    }

    return weeksArtist;
}

export {getArtists, getWeeksArtist};