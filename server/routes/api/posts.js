const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//get posts
router.get('/', async (req, res) => {
    const posts = await LoadPostsCollection();
    res.send(await posts.find({}).toArray());
});


//add posts
router.post('/', async (req, res) => {
    const posts = await LoadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
});


//delete posts
router.delete('/:id', async (req, res) => {
    const posts = await LoadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

//This will get our collection of posts so we can preform functions on it.
async function LoadPostsCollection() {

    // change your username and password here when testing locally.. or you can just use my user it doesnt matter to me. 
    //You'll just have to make one in mongodb if you want your own
    const client = await mongodb.MongoClient.connect('mongodb+srv://Blake_Lawton:santana77@cluster0.kdlwelg.mongodb.net/?retryWrites=true&w=majority');
   
    return client.db('vue_express').collection('posts');
}

module.exports = router;