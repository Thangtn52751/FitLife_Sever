const express = require("express");
const router = express.Router();
const roundController = require("../controllers/exerciseRoundController");

router.post("/", roundController.createRound);
router.get("/:exerciseId", roundController.getRoundsByExercise);

module.exports = router;
