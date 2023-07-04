const createAnswer =
  "INSERT INTO answer (id_assessment_register, id_question, value, justification) VALUES ($1, $2, $3, $4)";

const getAnswerByAssessmentRegister = `
    SELECT
        answer.id_answer,
        questions.title,
        questions.required_field,
        answer.value,
        answer.justification
    FROM assessment_register 
        INNER JOIN answer ON assessment_register.id_assessment_register = answer.id_assessment_register 
        INNER JOIN assessments ON assessment_register.id_assessment = assessments.id_assessment 
        INNER JOIN questions ON questions.id_assessment = assessments.id_assessment 
    WHERE answer.id_question = questions.id_question AND
    answer.id_assessment_register = $1
    ORDER BY answer.id_answer;
`;

module.exports = {
  createAnswer,
  getAnswerByAssessmentRegister,
};
