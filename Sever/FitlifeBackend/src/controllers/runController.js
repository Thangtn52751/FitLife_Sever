const Run = require("../models/runModel");

exports.createRun = async (req, res) => {
    try {
        const run = await Run.create(req.body);
        res.status(201).json(run);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getRunsByUser = async (req, res) => {
    try {
        const runs = await Run.find({ userId: req.params.userId }).sort({ startTime: -1 });
        res.json(runs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Cập nhật run
exports.updateRun = async (req, res) => {
    try {
        const updated = await Run.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xoá run
exports.deleteRun = async (req, res) => {
    try {
        await Run.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  };