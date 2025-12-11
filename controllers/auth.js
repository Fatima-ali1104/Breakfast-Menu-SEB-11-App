const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

router.get('/sign-up', async (req, res, next) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-out', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    
    const userInDatabase = await User.findOne({ username });

    if (userInDatabase) {
      return res.send('Username or Password is invalid');
    }
    
    if (password !== confirmPassword) {
      return res.send('Username or Password is invalid');
    }
   
    const hashPassword = bcrypt.hashSync(password, 10);

   
    req.body.password = hashPassword;
    delete req.body.confirmPassword;

    const user = await User.create(req.body);
    
    req.session.user = {
      username: user.username,
      _id: user._id,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong with registration!');
  }
});

router.get('/sign-in', async (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
  try {
    
    const { username, password } = req.body;
    
    const userInDatabase = await User.findOne({ username });

     if (!userInDatabase) {
      return res.send('Username or Password is invalid');
    }

    const isValidPassword = bcrypt.compareSync(password, userInDatabase.password);
     if (!isValidPassword) {
      return res.send('Username or Password is invalid');
    }

     req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong with Sign In');
  }
});

module.exports = router;
