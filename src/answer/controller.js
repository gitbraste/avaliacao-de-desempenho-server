const pool = require("../../config.js");
const queries = require("./queries.js");

const createAnswer = (req, res) => {
  const [id_assessment_register, data] = req.body;
  data.forEach((element) => {
    const { id, value, justification } = element;

    pool.query(
      queries.createAnswer,
      [id_assessment_register, id, value, justification],
      (error, results) => {
        if (error) throw error;
        res.status(200);
      }
    );
  });
};

const getAnswerByAssessmentRegister = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAnswerByAssessmentRegister, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAnswerByAssessmentRegister,
  createAnswer,
};
