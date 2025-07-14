const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorMiddleware = require('../src/middlewares/errorMiddleware');
const authRouter = require('../src/routers/authRouter');
const userRouter = require('../src/routers/userRouter');

const diaryRouter = require('./routers/diaryRouter');
const waterRouter = require('./routers/waterGoal');
const songRouter = require("./routers/songRouter");
const path = require("path");

const notificationRouter = require('../src/routers/notificationRouter');
const bmiRouter = require('../src/routers/bmiRouter');
const sleepRouter = require("./routers/sleepRouter");
const runRouter = require("./routers/runRouter");
const gpsRouter = require("./routers/gpsRouter");
const stepRouter = require("./routers/stepRouter");
const exerciseRouter = require("./routers/exerciseRouter");
const userExerciseRouter = require("./routers/userExerciseRouter");
const exerciseRoundRoutes = require("./routers/exerciseRoundRoutes");
const historyRouter = require('./routers/historyRouter')
const chatRoutes = require('./routers/chatRoutes');
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/diaries', diaryRouter);


app.use('/api/water', waterRouter);
// // Cấu hình phục vụ video tĩnh
// app.use('/videos', express.static(path.join(__dirname, 'video')));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/songs", songRouter);

app.use('/api/notifications', notificationRouter);
app.use('/api/bmi', bmiRouter);
app.use("/api/sleeps", sleepRouter);
app.use("/api/runs", runRouter);
app.use("/api/gps", gpsRouter);
app.use("/api/steps", stepRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/user-exercises", userExerciseRouter);
app.use("/api/exercise-rounds", exerciseRoundRoutes);
app.use("/api/history", historyRouter);
app.use('/api', chatRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use(errorMiddleware);
module.exports = app;





