const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signIn = require('./controllers/sign-in');
const getProfile = require('./controllers/get-profile');
const entryCount = require('./controllers/entry-count');
const clarifai = require('./controllers/clarifai');

const db = knex({
   client: 'pg',
   connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: "siddhant",
      database: 'smart-brain-db'
   }
});

const app = express();

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post("/signin", (req, res) => signIn.handleSignIn(req, res, db, bcrypt))
app.post("/register", (req, res) =>  register.handleRegister(req, res, db, bcrypt))
app.get("/profile/:id", (req, res) => getProfile.handleGetProfile(req, res, db))
app.post("/imageInput", (req, res) => clarifai.handleClarifaiAPI(req, res))
app.put("/image", (req, res) => entryCount.handleEntryCount(req, res, db))

app.listen(process.env.PORT || 3000, ()=> {
   console.log(`Server is running on port ${process.env.PORT || 3000}`)
});

