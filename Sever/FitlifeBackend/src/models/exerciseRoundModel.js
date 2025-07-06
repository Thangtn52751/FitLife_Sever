const mongoose = require("mongoose");

const exerciseRoundSchema = new mongoose.Schema({
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", required: true },
    title: { type: String, required: true },
    durationSec: { type: Number, required: true },
    order: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("ExerciseRound", exerciseRoundSchema);
