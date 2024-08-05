const mongoose = require('mongoose');

const userExamSchema = new mongoose.Schema({
  userId: String,
  examId: String,
  answers: [Number], // Array of indices corresponding to user's selected options
  isSubmitted: Boolean
});

const UserExam = mongoose.model('UserExam', userExamSchema);

module.exports = UserExam;
