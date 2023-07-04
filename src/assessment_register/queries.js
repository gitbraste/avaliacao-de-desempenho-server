const getAssessmentRegisterById = `SELECT 
        users.name, 
        users.email,
        assessments.title,
        assessments.id_assessment,
        assessment_register.id_assessment_register, 
        assessment_register.register,
        assessment_register.date_time, 
        assessment_register.status,
        assessment_register.validation_date,
        assessment_register.validation_email,
        g.name AS manager_name
    FROM assessment_register
        INNER JOIN assessments ON assessment_register.id_assessment = assessments.id_assessment
        INNER JOIN users ON assessment_register.register = users.register
        LEFT JOIN users g ON users.manager = g.register
    WHERE assessment_register.id_assessment_register = $1
    ORDER BY assessment_register.date_time DESC`;

const getAssessmentRegisterByManager = `SELECT 
        users.name, 
        users.email,
        assessments.title,
        assessments.id_assessment,
        assessment_register.id_assessment_register, 
        assessment_register.register,
        assessment_register.date_time, 
        assessment_register.status,
        assessment_register.validation_date,
        assessment_register.validation_email,
        g.name AS manager_name
    FROM assessment_register
        INNER JOIN assessments ON assessment_register.id_assessment = assessments.id_assessment
        INNER JOIN users ON assessment_register.register = users.register
        LEFT JOIN users g ON users.manager = g.register
    WHERE users.manager = $1
    ORDER BY assessment_register.date_time DESC`;

const getAssessmentRegisterByUser = `
    SELECT 
        users.name, 
        users.email,
        assessments.title,
        assessments.id_assessment,
        assessment_register.id_assessment_register, 
        assessment_register.register,
        assessment_register.date_time, 
        assessment_register.status,
        assessment_register.validation_date,
        assessment_register.validation_email,
        g.name AS manager_name
    FROM assessment_register
        INNER JOIN assessments ON assessment_register.id_assessment = assessments.id_assessment
        INNER JOIN users ON assessment_register.register = users.register
        LEFT JOIN users g ON users.manager = g.register
    WHERE users.register = $1
    ORDER BY assessment_register.date_time DESC`;

const getAssessmentRegisterByDate = `SELECT 
    assessment_register.id_assessment, 
    assessment_register.register, 
    users.name, 
    users.email,
    assessment_register.date_time, 
    assessment_register.status,
    assessment_register.validation_date,
    assessment_register.validation_email
    FROM assessment_register 
    INNER JOIN users ON assessment_register.register = users.register 
    WHERE users.manager = $1 AND (assessment_register.date_time >= $2 AND assessment_register.date_time <= $3)
    ORDER BY assessment_register.date_time DESC`;

const getAssessmentRegisterByDateAndUser = `SELECT 
    assessment_register.id_assessment, 
    assessment_register.register, 
    users.name, 
    users.email,
    assessment_register.date_time, 
    assessment_register.status,
    assessment_register.validation_date,
    assessment_register.validation_email
    FROM assessment_register 
    INNER JOIN users ON assessment_register.register = users.register 
    WHERE assessment_register.register = $1 AND users.manager = $2 AND (assessment_register.date_time >= $3 AND assessment_register.date_time <= $4)
    ORDER BY assessment.date_time DESC`;

const createAssessmentRegister = `INSERT INTO assessment_register
    (id_assessment, register, date_time) 
    VALUES ($1, $2, $3) 
    RETURNING id_assessment_register`;

const updateAssessmentRegisterStatus = `UPDATE assessment_register 
    SET status = '1', validation_date = $1, validation_email = $2
    WHERE id_assessment_register = $3`;

module.exports = {
  getAssessmentRegisterById,
  getAssessmentRegisterByManager,
  getAssessmentRegisterByUser,
  createAssessmentRegister,
  updateAssessmentRegisterStatus,
  getAssessmentRegisterByDate,
  getAssessmentRegisterByDateAndUser,
};
