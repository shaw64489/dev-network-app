const express = require('express');
//setup our router
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//import models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works!' }));

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //initialize variable errors
    const errors = {};
    //get current user
    //get promise - take profile returned
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        //user exists - send along profile
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
