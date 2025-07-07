const ExerciseRound = require("../models/exerciseRoundModel");

// Tạo round mới
exports.createRound = async (req, res) => {
    try {
        const round = await ExerciseRound.create(req.body);
        res.status(201).json(round);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lấy danh sách round theo exerciseId
exports.getRoundsByExercise = async (req, res) => {
    try {
        const rounds = await ExerciseRound.find({ exerciseId: req.params.exerciseId }).sort("order");
        res.json(rounds);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
