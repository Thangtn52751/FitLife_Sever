const asyncHandler = require('express-async-handler');
const BMIRecord = require('../models/bmiModel');

const createBMI = asyncHandler(async (req, res) => {
  const { userId, height, weight } = req.body;

  if (!userId || !height || !weight) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const bmiValue = +(weight / ((height / 100) ** 2)).toFixed(2);

  const bmiRecord = await BMIRecord.create({
    userId,
    height,
    weight,
    bmiValue
  });

  res.status(201).json(bmiRecord);
});


const getBMIByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const records = await BMIRecord.find({ userId }).sort({ recordDate: -1 });

  res.json(records);
});

const deleteBMI = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await BMIRecord.findByIdAndDelete(id);

  if (!record) {
    res.status(404);
    throw new Error('BMI record not found');
  }

  res.json({ message: 'BMI record deleted' });
});

module.exports = {
  createBMI,
  getBMIByUser,
  deleteBMI,
};
