
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();


connectDB();


const PORT = process.env.PORT || 8005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
