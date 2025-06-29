const GPSPoint = require("../models/gpsPointModel");

exports.addGPSPoints = async (req, res) => {
    try {
        const gpsPoints = await GPSPoint.insertMany(req.body); // body là array
        res.status(201).json(gpsPoints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGPSByRoute = async (req, res) => {
    try {
        const points = await GPSPoint.find({ routeId: req.params.routeId });
        res.json(points);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Xoá tất cả GPS theo routeId
exports.deleteGPSByRoute = async (req, res) => {
    try {
        await GPSPoint.deleteMany({ routeId: req.params.routeId });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  