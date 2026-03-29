const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db');
    
const taskMockRoutes = require('./routes/taskMockRoutes');
const taskRoutes = require('./routes/task.route');

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

app.use('/api/v1', taskMockRoutes);
app.use('/api/v2', taskRoutes);

module.exports = app;