const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require ('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/MeanCourse')
.then(()=>{
  console.log('Connected to database!')
})
.catch(()=>{
  console.log('Connection failed')
});


const Post = require('./models/post');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added succesfully',
      postId: createdPost._id
    })
  });
});

app.put("/api/post/:id", (req, res, next)=>{

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({_id: req.params.id}, post).then((result)=>{
    console.log(result);
    res.status(200).json({
      message: 'Update succesfully',
    });
  });
});

app.get('/api/posts', (req,res, next)=>{
  Post.find()
  .then((posts)=>{
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: posts
    });
  });
});

app.delete('/api/posts/:id', (req,res, next)=>{
  Post.deleteOne({
    _id: req.params.id
  })
  .then((result)=>{
    console.log(result);
    res.status(200).json({
      message: 'Post deleted succesfully',
    });
  });


});

module.exports = app;
