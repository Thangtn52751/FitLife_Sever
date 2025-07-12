// 📁 models/historyModel.js
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: String,
    videoId: String,
    title: String,
    thumbnail: String,
    duration: Number,
    timestamp: Date,
});

module.exports = mongoose.model("History", historySchema);
