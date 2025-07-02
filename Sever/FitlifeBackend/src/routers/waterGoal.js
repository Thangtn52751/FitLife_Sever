const express = require("express");
const router = express.Router();
const waterGoalController = require("../controllers/DrinkWater/waterGoalController")
const {verifyToken} = require("../middlewares/authMiddleware");

router.post('/set', verifyToken, waterGoalController.setGoal);

router.put("/drink", verifyToken, waterGoalController.drinkWater);

router.get("/today", verifyToken, waterGoalController.getTodayGoal);

router.get("/history", verifyToken, waterGoalController.getHistory);

router.get("/report", verifyToken,waterGoalController.getWaterReport);

module.exports = router;