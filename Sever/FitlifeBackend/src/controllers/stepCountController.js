const StepCount = require("../models/stepCountModel");

exports.createStepRecord = async (req, res) => {
    try {
        const record = await StepCount.create(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStepsByUser = async (req, res) => {
    try {
        const data = await StepCount.find({ userId: req.params.userId }).sort({ recordDate: -1 });
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cập nhật step theo ID
exports.updateStep = async (req, res) => {
    try {
        const updated = await StepCount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xoá step theo ID
exports.deleteStep = async (req, res) => {
    try {
        await StepCount.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  