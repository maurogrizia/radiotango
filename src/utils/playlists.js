import axios                    from "axios";

import { getIsUpdateNeeded }    from './time';

let playlists =   /* window.localStorage.getItem('playlists')
                ? JSON.parse(window.localStorage.getItem('playlists'))
                : */ [];

const getPlaylists = async () => {
    const itemLastUpdate =/*  window.localStorage.getItem('lastUpdate')
        ? JSON.parse(window.localStorage.getItem('lastUpdate'))
        : */ {};
    const isUpdateNeeded = !itemLastUpdate.playlists 
                        || getIsUpdateNeeded(itemLastUpdate);

    try {
        if (playlists.length === 0 || isUpdateNeeded) {
            const response = await axios.get('/api/playlists');
            
            playlists = response.data;
            itemLastUpdate.playlists = Date.now();
            //window.localStorage.setItem('playlists', JSON.stringify(response.data));
            //window.localStorage.setItem('lastUpdate', JSON.stringify(itemLastUpdate));
            //console.log('playlists update!')
        }
        
        return playlists;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}

export {getPlaylists};