const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path');
const postsRoutes = require ('./routes/posts');
const userRoutes = require ('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/MeanCourse')
.then(()=>{
  console.log('Connected to database!')
})
.catch(()=>{
  console.log('Connection failed')
});

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use('/images', express.static(path.join('images')));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
