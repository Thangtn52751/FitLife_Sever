const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    durationMin: { type: Number },
    calories: { type: Number },
    imageUrl: { type: String },
    videoUrl: { type: String },
    level: { type: String } // Beginner, Intermediate, Advanced
}, {
    timestamps: true
});

module.exports = mongoose.model("Exercise", exerciseSchema);
