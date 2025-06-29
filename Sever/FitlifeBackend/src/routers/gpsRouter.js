const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gpsPointController");

router.post("/", gpsController.addGPSPoints);
router.get("/:routeId", gpsController.getGPSByRoute);
router.delete("/route/:routeId", gpsController.deleteGPSByRoute);

module.exports = router;
