const express = require('express');
//setup our router
const router = express.Router();
const gravatar = require('gravatar');
//to encrypt password
const bcrypt = require('bcryptjs');

//pull in User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works!' }));

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  //find an email that matches
  //use promise - give us user
  //check that user
  User.findOne({ email: req.body.email }).then(user => {
    //if user exists
    //return 400 err
    if (user) {
      //send json error
      res.status(400).json({ email: 'Email already exists' });
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

module.exports = router;
