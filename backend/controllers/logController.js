const Log = require("../models/Log");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId };  //  You must have this line
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.createLog = async (req, res) => {
  try {
    const { date, hours, lab, description } = req.body;
    const userId = req.user._id;

    const log = new Log({
      userId,
      date: new Date(date),
      hours,
      lab,
      description,
    });

    await log.save();

    res.status(201).json({ message: "Log entry created", log });
  } catch (error) {
    console.error("Log creation error:", error);
    res.status(500).json({ error: "Failed to create log entry" });
  }
};

exports.getUserLog = [
  authenticate,
  async (req, res) => {
    try {
      const logs = await Log.find({ userId: req.user._id }).sort({ date: -1 });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  }
];


exports.getAllLogs = [
  authenticate,
  async (req, res) => {
    try {
      const logs = await Log.find().sort({ date: -1 });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch all logs' });
    }
  }
];
