const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, required: true},
  hours: {type: Number, required: true},
});
const Log = mongoose.model('Log', logSchema);

module.exports = Log;