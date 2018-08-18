const express = require('express');
//setup our router
const router = express.Router();
const gravatar = require('gravatar');
//to encrypt password
const bcrypt = require('bcryptjs');
//import json web token
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input Validation
const validateRegisterInput = require('../../validation/register');

const validateLoginInput = require('../../validation/login');

//pull in User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works!' }));

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //if value is not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find an email that matches
  //use promise - give us user
  //check that user
  User.findOne({ email: req.body.email }).then(user => {
    errors.email = 'Email already exists';
    //if user exists
    //return 400 err
    if (user) {
      //send json error
      res.status(400).json(errors);
    } else {
      //create avatar
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        default: 'mm' //default image placeholder
      });
      //proceed to create our new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        //avatar: avatar same as ES6 below
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        //get salt and hash our password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //if err - if not we get our hash
          if (err) throw err;

          //set newUser password to the hash
          newUser.password = hash;
          //save new user - promise back give us created user
          //send back success response with that user
          //catch in case something wrong
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user/ returning JWT token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //if value is not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //store user email and password
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  //gives us promise - give us user
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'User not found';
      //if user is not found
      return res.status(404).json(errors);
    }

    //check password
    //use bcrypt to compare the passwords
    //pass plain password - get hashed password from User
    //promise gives true or false value if matched
    bcrypt.compare(password, user.password).then(isMatch => {
      //check if isMatch is true
      if (isMatch) {
        //User matched

        //create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign token
        //takes payload - included in token (some user info)
        //secret key - put in config file
        //expiration
        //callback - error and token - send token as response
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
        //if doesnt match
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
//add passport authenticate
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
