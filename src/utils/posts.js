import axios                    from "axios";

let posts = [];

const getPosts = async () => {
    try {
        if (posts.length === 0) {
            const response = await axios.get('/api/posts');

            posts = response.data;
        }

        return posts;
    } catch (e) {
        console.log(e.message);

        return [];
    }
}

export { getPosts };