const mongoose = require('mongoose');

const stepCountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recordDate: { type: Date, required: true },
    steps: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    calories: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("StepCount", stepCountSchema);

