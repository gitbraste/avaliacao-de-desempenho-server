const pool = require('../../config.js');
const queries = require('./queries.js');

const getQuestionsByAssessment = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getQuestionsByAssessment, [id], (error, results)=> {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getQuestionsByAssessment
};