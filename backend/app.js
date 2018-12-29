const express = require('express');
const bodyParse = require('body-parser');

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added succesfully'
  })
});

app.get('/api/posts', (req,res, next)=>{
  const posts = [
    {
      id: 'fadf123',
      title: 'Firtss erver post',
      content:'holiii'
    },
    {
      id: 'erererer',
      title: 'el sehundo erver post',
      content:'hola hola holaaaasaaa'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts,
  });
});

module.exports = app;
