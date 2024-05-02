const { validationResult } = require('express-validator');
const questions = require('../modules/questionsModel');

exports.fetchAll = async (req, res, next) => {
    try {
        const [rows] = await questions.fetchAll();
        res.status(200).json(rows);
    } catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.fetchByCategory = async (req, res, next) => {
    try {
        const [rows] = await questions.fetchByCategory(req.params.category);
        res.status(200).json(rows);
    } catch(error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.fetchByDifficulty = async (req, res, next) => {
    try {
        const [rows] = await questions.fetchByDifficulty(req.params.difficulty);
        res.status(200).json(rows);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer } = req.body;
        const [rows] = await questions.add(category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer);
        res.status(201).json(rows);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const [rows] = await questions.delete(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.editQuestion = async (req, res) => {
    const { id } = req.params;
    const { category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer } = req.body;
    console.log("Received data for edit:", { category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer });
    
    try {
        const result = await questions.edit(id, category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'No question found with that ID' });
        }
        res.send({ message: 'Question updated successfully', affectedRows: result.affectedRows });
    } catch (err) {
        console.error("Error updating question:", err);
        res.status(500).send({ message: 'Failed to update question', error: err.message });
    }
};

exports.fetchRandomCategories = async (req, res, next) => {
    try {
        const [rows] = await questions.fetchRandomCategories();
        res.status(200).json(rows);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.generateQuiz = async (req, res) => {
    try {
        const { category } = req.params;
        const difficulties = ['Easy', 'Medium', 'Hard'];
        
        let quizQuestions = [];

        for (let difficulty of difficulties) {            
            const [rows] = await questions.generateQuiz(category, difficulty);
            quizQuestions = quizQuestions.concat(rows);
        }

        res.json(quizQuestions);
    } catch (error) {
        console.error('Failed to generate quiz:', error);
        res.status(500).send('Error generating quiz');
    }
};
