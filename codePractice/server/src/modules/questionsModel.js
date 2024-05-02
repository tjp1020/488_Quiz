const db = require('../utils/sql');

module.exports = class questionsModel {
    constructor(category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer) {
        this.category = category;
        this.difficulty = difficulty;
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correct_answer = correct_answer;
    }

    static fetchAll() {
        return db.execute('select * from Trivia');
    }

    static fetchByCategory(category) {
        return db.execute('select * from Trivia where category = ?', [category]);
    }

    static fetchByDifficulty(difficulty) {
        return db.execute('select * from Trivia where difficulty = ?', [difficulty]);
    }

    static delete(id) {
        return db.execute('Delete from Trivia where id = ?', [id]);
    }

    static add(category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer) {
        return db.execute(
            'insert into Trivia (category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer) values (?,?,?,?,?,?,?,?)',
            [category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer]
        )
    }
    static edit(questionId, category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer) {
        return db.execute(
            'UPDATE Trivia SET category = ?, difficulty = ?, question = ?, answer1 = ?, answer2 = ?, answer3 = ?, answer4 = ?, correct_answer = ? WHERE id = ?',
            [category, difficulty, question, answer1, answer2, answer3, answer4, correct_answer, questionId]
        );
    }

    static fetchRandomCategories() {
        return db.execute('SELECT DISTINCT category FROM Trivia ORDER BY RAND() LIMIT 2');
    }

    static generateQuiz(category, difficulty) {
        return db.execute(
            'SELECT * FROM Trivia WHERE category = ? AND difficulty = ? ORDER BY RAND() LIMIT 5',
            [category, difficulty]
        );
    }
};

