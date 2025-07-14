const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  description: { type: String, default: '', },
});
const Log = mongoose.model('Log', logSchema);

module.exports = Log;