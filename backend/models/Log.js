import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
   lab: { type: String },
  description: { type: String, default: '', },
});
const Log = mongoose.model('Log', logSchema);

export default Log;