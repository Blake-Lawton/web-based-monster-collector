import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService{

    //get posts
    static async GetPosts() {
        
        try {
            const res = await axios.get(url)
            const data = res.data
      
            return data.map(post => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))
          } catch (err) {
            return err
          }
    }

    //create post
    static InsertPost(text){
        return axios.post(url, {
            text
        });
    }

    //delete post
    static DeletePost(id){
        return axios.delete(url + id);
    }
}

export default PostService;