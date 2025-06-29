const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    name : {type : String, require : true},
    description : String,
    image : String,
    audio : {type : String, require : true},
    singer : String,
    lyric : String,
    duration : String,
},{timestamps : true});

module.exports = mongoose.model("Song", SongSchema);