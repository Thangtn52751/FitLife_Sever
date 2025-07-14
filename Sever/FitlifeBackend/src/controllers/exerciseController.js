const Exercise = require("../models/exerciseModel");
const ExerciseRound = require("../models/exerciseRoundModel");

// Tạo bài tập kèm rounds
exports.createExercise = async (req, res) => {
    try {
<<<<<<< HEAD
        const exercise = await Exercise.create(req.body);
        res.status(201).json(exercise);
    } catch (err) { 
=======
        const {
            title,
            description,
            durationMin,
            calories,
            imageUrl,
            videoUrl,
            level,
            rounds, // 👈 lấy rounds từ body nếu có
        } = req.body;

        // Bước 1: tạo exercise
        const exercise = await Exercise.create({
            title,
            description,
            durationMin,
            calories,
            imageUrl,
            videoUrl,
            level,
        });

        // Bước 2: nếu có rounds, tạo từng round kèm theo exerciseId
        if (Array.isArray(rounds) && rounds.length > 0) {
            const roundDocs = rounds.map((round, index) => ({
                title: round.title,
                durationSec: round.durationSec,
                order: round.order || index + 1,
                exerciseId: exercise._id,
            }));

            await ExerciseRound.insertMany(roundDocs);
        }

        res.status(201).json({
            message: "Tạo bài tập và các round thành công",
            exerciseId: exercise._id,
        });
    } catch (err) {
>>>>>>> a032d0142515bf078108bc983653f04458645b42
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
