const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  //if data handle is empty then we set it to empty string
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  //validate handle length
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 chars';
  }

  //validate handle exists
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  //validate status exists
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  //validate skills exists
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  //check if website is not empty then do url validator check
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  //check if youtube is not empty then do url validator check
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  //check if twitter is not empty then do url validator check
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  //check if facebook is not empty then do url validator check
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  //check if linkedin is not empty then do url validator check
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  //check if instagram is not empty then do url validator check
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
