const mongoose = require('mongoose')

const WaterGoalSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", require: true},
    targetGlasses : {type: Number, require : true},
    achieveGlasses : {type: Number, default: 0 },
    volumePerGlass : {type: Number, require: true},
    date : {type: Date, require: true},
},{timestamps : true}
);

module.exports = mongoose.model('WaterGoal', WaterGoalSchema);