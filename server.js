const express = require('express');

//initialize app to express
const app = express();

//simple route to get up and running
app.get('/', (req, res) => res.send('Hello'));

//create port variable 5000
//for heroku deploy - process.env
const port = process.env.PORT || 5000;

//listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));
