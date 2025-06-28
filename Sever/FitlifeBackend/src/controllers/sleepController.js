const Sleep = require("../models/sleepModel");

// Tạo bản ghi giấc ngủ mới
exports.createSleep = async (req, res) => {
    try {
        const newSleep = new Sleep(req.body);
        const saved = await newSleep.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả giấc ngủ của 1 user
exports.getSleepsByUser = async (req, res) => {
    try {
        const sleeps = await Sleep.find({ user_id: req.params.userId }).sort({ date: -1 });
        res.status(200).json(sleeps);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật bản ghi giấc ngủ
exports.updateSleep = async (req, res) => {
    try {
        const updated = await Sleep.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xoá bản ghi giấc ngủ
exports.deleteSleep = async (req, res) => {
    try {
        await Sleep.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
