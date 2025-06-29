const mongoose = require("mongoose");

const WaterIntakeSchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref : "User", require: true },
    drankAt : { type : Date, default: Date.now},
    volumeMl : { type : Number, require : true },
}, {timestamps : true}
);

module.exports = mongoose.model("WaterIntake", WaterIntakeSchema);