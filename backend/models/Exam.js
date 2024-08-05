const mongoose = require('mongoose');
const QuestionSchema = require('./Question');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'application-process', 'ongoing', 'waiting-for-result', 'completed'],
    default: 'application-process',
  },
  applicationStartDate: {
    type: Date,
    required: true,
  },
  applicationEndDate: {
    type: Date,
    required: true,
  },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Exam', ExamSchema);
