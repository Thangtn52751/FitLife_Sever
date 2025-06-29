const express = require("express");
const router = express.Router();
const sleepController = require("../controllers/sleepController");

// CRUD routes cho sleep
router.post("/", sleepController.createSleep);
router.get("/:userId", sleepController.getSleepsByUser);
router.put("/:id", sleepController.updateSleep);
router.delete("/:id", sleepController.deleteSleep);

module.exports = router;

