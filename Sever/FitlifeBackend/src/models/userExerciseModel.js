const mongoose = require("mongoose");

const userExerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", required: true },
    performedAt: { type: Date, required: true },
    durationSec: { type: Number, required: true },
    progress: { type: Number, default: 0 } // % completion
}, {
    timestamps: true
});

module.exports = mongoose.model("UserExercise", userExerciseSchema);
