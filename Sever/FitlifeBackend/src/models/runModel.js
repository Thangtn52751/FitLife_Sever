const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalDistanceKm: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Run", runSchema);
