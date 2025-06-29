const mongoose = require('mongoose');

const gpsPointSchema = new mongoose.Schema({
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("GPSPoint", gpsPointSchema);

