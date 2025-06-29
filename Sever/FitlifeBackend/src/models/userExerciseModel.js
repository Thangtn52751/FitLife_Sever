const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", required: true },
    performedAt: { type: Date, required: true },
    durationSec: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("UserExercise", userExerciseSchema);
