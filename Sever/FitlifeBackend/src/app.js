const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorMiddleware = require('../src/middlewares/errorMiddleware');
const authRouter = require('../src/routers/authRouter');
const userRouter = require('../src/routers/userRouter');
const sleepRouter = require("./routers/sleepRouter");
const runRouter = require("./routers/runRouter");
const gpsRouter = require("./routers/gpsRouter");
const stepRouter = require("./routers/stepRouter");
const exerciseRouter = require("./routers/exerciseRouter");
const userExerciseRouter = require("./routers/userExerciseRouter");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use("/api/sleeps", sleepRouter);
app.use("/api/runs", runRouter);
app.use("/api/gps", gpsRouter);
app.use("/api/steps", stepRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/user-exercises", userExerciseRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use(errorMiddleware);

module.exports = app;



