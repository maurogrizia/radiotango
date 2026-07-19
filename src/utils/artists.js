import axios from "axios";

let artists = {};

const getArtists = async () => {
  try {
    if (Object.keys(artists).length === 0) {
      const response = await axios.get('/api/artists');

      artists = response.data;
    }

    return artists;
  } catch (e) {
    console.log(e.message);

    return [];
  }
};

const getWeeksArtist = async () => {
  if (Object.keys(artists).length === 0) {
    artists = await getArtists();
  }
  const entries = Object.entries(artists);

  let weeksArtist = entries[0] ? entries[0][1].href : null;
  let done = false;

  for (let i = 0; i < entries.length && !done; i++) {
    if (entries[i][1].star === true) {
      weeksArtist = entries[i][0];
      done = true;
    }
  }

  return weeksArtist;
}

export { getArtists, getWeeksArtist };
