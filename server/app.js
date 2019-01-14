const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
    'mongodb://<Ztruk11>:<beBViFe9vah7nsH>@ds131973.mlab.com:31973/my-blog',
    { useNewUrlParser: true }
);

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
