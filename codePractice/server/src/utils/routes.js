const express = require('express');
const bodyParser = require('body-parser');
const questionsController = require('./questionsController');

const app = express();
app.use(bodyParser.json());

console.log('Imported questionsController:', questionsController);

app.get('/getAll', questionsController.fetchAll);

app.get('/getByCategory/:category', questionsController.fetchByCategory);

app.get('/getByDifficulty/:difficulty', questionsController.fetchByDifficulty);

app.post('/add', questionsController.add);

app.delete('/delete/:id', questionsController.delete);

console.log('editQuestion function:', questionsController.editQuestion);

app.put('/editQuestion/:id', questionsController.editQuestion);

app.get('/getRandomCategories', questionsController.fetchRandomCategories);

app.get('/quiz/:category', questionsController.generateQuiz);

module.exports = app;
