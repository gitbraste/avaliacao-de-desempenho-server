const getQuestionsByAssessment = "SELECT * FROM questions WHERE id_assessment = $1 ORDER BY id_question";

module.exports = {
    getQuestionsByAssessment
};