const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorMiddleware = require('../src/middlewares/errorMiddleware');
const authRouter = require('../src/routers/authRouter');
const userRouter = require('../src/routers/userRouter');
const diaryRouter = require('./routers/diaryRouter');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/diaries', diaryRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});




app.use(errorMiddleware);





module.exports = app;
