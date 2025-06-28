const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");

router.post("/", runController.createRun);
router.get("/:userId", runController.getRunsByUser);
router.put("/:id", runController.updateRun);
router.delete("/:id", runController.deleteRun);

module.exports = router;
