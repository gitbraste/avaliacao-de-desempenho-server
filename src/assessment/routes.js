const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/assessments', controller.getAssessments);

module.exports = router;