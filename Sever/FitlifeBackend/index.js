const dotenv = require('dotenv');
const app = require('./src/app');
const connectDB = require('./src/configs/connectDb');

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
