const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/assessment/:id", controller.getAnswerByAssessmentRegister);
router.post("/create", controller.createAnswer);

module.exports = router;
