const express = require("express");
const router = express.Router();
const stepController = require("../controllers/stepCountController");

router.post("/", stepController.createStepRecord);
router.get("/:userId", stepController.getStepsByUser);
router.put("/:id", stepController.updateStep);
router.delete("/:id", stepController.deleteStep);

module.exports = router;
