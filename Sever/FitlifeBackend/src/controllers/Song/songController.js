const SongModel = require("../../models/Song/songModel");
const asyncHandler = require('express-async-handler');

exports.addSong = asyncHandler(async (req, res) => {
    const {name, description, image, singer, lyric, duration} = req.body;
    if(!name || !req.file){
        res.status(400);
        throw new Error("Thiếu tên hoặc file nhạc");
    }

    const song = await SongModel.create({
        name,
        description,
        image,
        audio : `/uploads/songs/${req.file.filename}`,
        singer,
        lyric,
        duration,
    });

    res.json({success : true, data: song});
});

exports.getAllSongs = asyncHandler(async (req, res)=> {
    const songs = await SongModel.find().sort({createAt: -1});
    res.json({success : true , data: songs});
})

exports.deleteSong = asyncHandler(async (req, res) =>{
    const song = await SongModel.findById(req.params.id);
    if(!song){
        res.status(404);
        throw new Error("Bài hát không tồn tại");
    }
    await song.deleteOne();
    res.json({success: true, message : "Đã xóa bài hát"})
});

exports.updateSong = asyncHandler(async (req, res) =>{
    const song = await SongModel.findById(req.params.id);
    if(!song){
        res.status(404);
        throw new Error("Bài hát không tồn tại");
    }

    Object.assign(song, req.body)
    await song.save();

    res.json({success : true, data : song});
})
