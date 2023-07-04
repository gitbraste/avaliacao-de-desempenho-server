const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/assessment/:id', controller.getQuestionsByAssessment);

module.exports = router;