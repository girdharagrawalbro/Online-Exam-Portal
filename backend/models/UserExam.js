const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserExamSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: { type: String, required: true },
  isSubmitted: { type: Boolean, default: false },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserExam', UserExamSchema);
