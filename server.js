const express = require('express');
const mongoose = require('mongoose');

//import routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initialize app to express
const app = express();

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

//simple route to get up and running
app.get('/', (req, res) => res.send('Hello'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//create port variable 5000
//for heroku deploy - process.env
const port = process.env.PORT || 5000;

//listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));
