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

    //Input password here when working on in your local enviroment 
    const client = await mongodb.MongoClient.connect('mongodb+srv://Blake_Lawton:<password>@cluster0.kdlwelg.mongodb.net/?retryWrites=true&w=majority');
   
    return client.db('vue_express').collection('posts');
}

module.exports = router;