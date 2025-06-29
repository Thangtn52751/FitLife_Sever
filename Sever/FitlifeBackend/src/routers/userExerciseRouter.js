const express = require("express");
const router = express.Router();
const userExerciseController = require("../controllers/userExerciseController");

router.post("/", userExerciseController.createUserExercise);
router.get("/:userId", userExerciseController.getUserExercises);
router.put("/:id", userExerciseController.updateUserExercise);
router.delete("/:id", userExerciseController.deleteUserExercise);

module.exports = router;
