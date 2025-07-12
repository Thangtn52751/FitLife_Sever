// 📁 controllers/historyController.js
const History = require("../models/historyModel");

exports.saveHistory = async (req, res) => {
    try {
        const newRecord = new History(req.body);
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ error: "Lưu lịch sử thất bại" });
    }
};

exports.getHistoryByUser = async (req, res) => {
    try {
        const history = await History.find({ userId: req.params.userId }).sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Không thể lấy lịch sử" });
    }
};
