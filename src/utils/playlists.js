import axios                    from "axios";

let playlists = [];

const getPlaylists = async () => {
    try {
        if (playlists.length === 0) {
            const response = await axios.get('/api/playlists');

            playlists = response.data;
        }

        return playlists;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}

export {getPlaylists};