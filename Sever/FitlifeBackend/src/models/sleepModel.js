const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sleep_start: {
        type: Date,
        required: true
    },
    sleep_end: {
        type: Date,
        required: true
    },
    quality_score: {
        type: Number,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Sleep", sleepSchema);
