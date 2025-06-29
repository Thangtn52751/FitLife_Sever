const UserExercise = require("../models/userExerciseModel");

// Tạo bài tập cho user
exports.createUserExercise = async (req, res) => {
    try {
        const userExercise = await UserExercise.create(req.body);
        res.status(201).json(userExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lấy danh sách bài tập của user
exports.getUserExercises = async (req, res) => {
    try {
        const userExercises = await UserExercise.find({ userId: req.params.userId });
        res.json(userExercises);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cập nhật bài tập của user
exports.updateUserExercise = async (req, res) => {
    try {
        const updated = await UserExercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xoá bài tập của user
exports.deleteUserExercise = async (req, res) => {
    try {
        await UserExercise.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
