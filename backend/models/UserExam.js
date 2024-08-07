const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserExamSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  examId: { type: String, required: true },
  answers: { type: [String], required: true }, // Define as an array of strings
  isSubmitted: { type: Boolean, default: false },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 }
});


module.exports = mongoose.model('UserExam', UserExamSchema);
