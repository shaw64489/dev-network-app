const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//import routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initialize app to express
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import and config db config
const db = require('./config/keys').mongoURI;

//connect to mongodb through mongoose
//promise returned - if it connects successfully console log
//catch error - console log the error
mongoose
  .connect(
    db,
    // to avoid depreciation error
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongo DB Connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Serve static assest if in production
//test if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//create port variable 5000
//for heroku deploy - process.env
const port = process.env.PORT || 5000;

//listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));
