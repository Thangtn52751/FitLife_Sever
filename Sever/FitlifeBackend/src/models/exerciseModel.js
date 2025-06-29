const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Exercise", exerciseSchema);
