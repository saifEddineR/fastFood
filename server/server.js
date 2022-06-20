const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// database configuration
const connectDB = require('./config/connectDB');
connectDB();
// Routes
app.use('/api/v1/users', require('./routes/userRoutes'));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is running on port ${port}`));
