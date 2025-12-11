// imports
require("dotenv").config() // allows us to use the .env variables
require('./config/database.js')
const express = require("express") //importing express package
const app = express() // creates a express application
const path = require('path');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const mongoose = require("mongoose") // importing mongoose
const morgan = require("morgan")
const methodOverride = require("method-override")
const port = process.env.PORT ? process.env.PORT : '3000';


const authCtrl = require('./controllers/auth');
const foodCtrl=  require('./controllers/food');




// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);



app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.use('/auth', authCtrl);













// Routes go here


















app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000




