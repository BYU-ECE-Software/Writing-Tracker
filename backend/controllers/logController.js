const Log = require("../models/Log");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

(exports.createLog = authenticate),
  async (req, res) => {
    const { hours, date } = req.body;
    const log = new Log({ userId: req.userId, hours, date });
    await log.save();
    res.status(201).json({ message: "Log logged" });
  };

(exports.getUserLog = authenticate),
  async (req, res) => {
    const logs = await Log.find({ userId: req.userId }).sort({ date: -1 });
    res.json(logs);
  };

(exports.getAllLogs = authenticate),
  async (req, res) => {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  };
