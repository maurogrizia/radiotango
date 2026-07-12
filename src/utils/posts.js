import axios                    from "axios";

import { getIsUpdateNeeded }    from './time';

let posts =   /* window.localStorage.getItem('posts')
                ? JSON.parse(window.localStorage.getItem('posts'))
                : */ [];

const getPosts = async () => {
    const itemLastUpdate = /* window.localStorage.getItem('lastUpdate')
        ? JSON.parse(window.localStorage.getItem('lastUpdate'))
        : */ {};
    const isUpdateNeeded = !itemLastUpdate.posts 
                        || getIsUpdateNeeded(itemLastUpdate);

    try {
        if (posts.length === 0 || isUpdateNeeded) {
            const response = await axios.get('/api/posts');
            
            posts = response.data;
            itemLastUpdate.posts = Date.now();
            //window.localStorage.setItem('posts', JSON.stringify(response.data));
            //window.localStorage.setItem('lastUpdate', JSON.stringify(itemLastUpdate));
            //console.log('posts update!')
        }
        
        return posts;
    } catch (e) {
        console.log(e.message);

        return [];
    }
}

export { getPosts };