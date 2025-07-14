require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/logRoutes');
const Log = require('./models/Log');

const allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId }; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


app.get('/api/leaderboard', authenticate, async (req, res) => {
  const { period } = req.query;
  const startDate = new Date();
  if (period === 'week') startDate.setDate(startDate.getDate() - 7);
  else if (period === 'month') startDate.setMonth(startDate.getMonth() - 1);
  else startDate.setFullYear(startDate.getFullYear() - 1);

  const leaderboard = await Log.aggregate([
  { $match: { date: { $gte: startDate } } }, // <-- Fix here
  {
    $group: {
      _id: '$userId',
      totalHours: { $sum: '$hours' },
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'user',
    },
  },
  { $unwind: '$user' },
  {
    $project: {
      username: '$user.username',
      totalHours: 1,
    },
  },
  { $sort: { totalHours: -1 } },
]);

  res.json(leaderboard);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

const PORT = process.env.PORT || 5000;
const IP = process.env.IP || 'localhost';

app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
