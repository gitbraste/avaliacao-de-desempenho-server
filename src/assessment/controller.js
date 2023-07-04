const pool = require("../../config.js");
const queries = require("./queries.js");

const getAssessments = (req, res) => {
  pool.query(queries.getAssessments, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAssessments
};
