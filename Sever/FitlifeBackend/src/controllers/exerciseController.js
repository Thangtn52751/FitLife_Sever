const Exercise = require("../models/exerciseModel");
const ExerciseRound = require("../models/exerciseRoundModel");

// Tạo bài tập kèm rounds
exports.createExercise = async (req, res) => {
    try {
        const exercise = await Exercise.create(req.body);
        res.status(201).json(exercise);
    } catch (err) { 

        res.status(400).json({ error: err.message });
    }
};

// Lấy danh sách bài tập
exports.getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json({ success: true, data: exercises });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cập nhật bài tập
exports.updateExercise = async (req, res) => {
    try {
        const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xoá bài tập
exports.deleteExercise = async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
