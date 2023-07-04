const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.post("/filter", controller.getAssessmentUsingFilter);
router.get("/:id", controller.getAssessmentRegisterById);
router.get("/user/:register", controller.getAssessmentRegisterByUser);
router.get("/manager/:manager", controller.getAssessmentRegisterByManager);
router.post("/create", controller.createAssessmentRegister);
router.put("/update/:id", controller.updateAssessmentRegisterStatus);

module.exports = router;
