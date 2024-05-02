
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./utils/routes');
const questionsController = require('./utils/questionsController');
const cors = require('cors');

console.log('editQuestion Loaded:', questionsController.editQuestion);

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

const ports = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/trivia', routes);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
