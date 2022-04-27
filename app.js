const express = require('express');
require('dotenv').config();
require('./models/db');
const app = express();
const User = require('./models/user');
const userRouter = require('./routes/user');



app.use(express.json());
app.use(userRouter);





app.get('/', (req, res) =>{
    res.send("<h1> hello world </h1>");
})

    app.listen(8000, ()=>{
        console.log('port is listening');
  });