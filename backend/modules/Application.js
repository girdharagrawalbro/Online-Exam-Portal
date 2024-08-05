const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['applied', 'under-review', 'accepted', 'rejected'],
    default: 'applied',
  },
  // Add any other fields relevant to the application process
});

const Application = mongoose.model('ExamApplication', ExamApplicationSchema);
module.exports = Application;
