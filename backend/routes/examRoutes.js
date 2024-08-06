const express = require("express");
const Exam = require("../models/Exam");
const Application = require("../models/Application");
const router = express.Router();
const bodyParser = require('body-parser');
const UserExam = require('../models/UserExam');
// Middleware to parse JSON
router.use(bodyParser.json());

// Get all exams or exams by status
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status: status } : {};
    const exams = await Exam.find(query);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Exam
router.post("/", async (req, res) => {
  const { title, description, date, time, questions } = req.body;
  const newExam = new Exam({
    title,
    description,
    date,
    time,
    questions,
  });

  try {
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add applications
router.post("/add-applications", async (req, res) => {
  const { user, exam } = req.body;
  const newApplication = new Application({ user, exam });

  try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user applications
router.get("/user-applications/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const applications = await Application.find({ user: userId }).populate('exam').populate('user');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all applications (for admin view)
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().populate('exam').populate('user');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept an application
router.patch("/applications/:applicationId/accept", async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status: "accepted" }, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject an application
router.patch("/applications/:applicationId/reject", async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status: "rejected" }, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single exam by ID
router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing Exam
router.put("/:id", async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(updatedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an Exam
router.delete("/:id", async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a question to an exam
router.post("/:id/questions", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    exam.questions.push(req.body);
    const updatedExam = await exam.save();
    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a question from an exam
router.delete("/:id/questions/:questionId", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    exam.questions.id(req.params.questionId).remove();
    const updatedExam = await exam.save();
    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a question in an exam
router.post('/addquestions', async (req, res) => {
  const { examId, question } = req.body;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found", examid : examId });
    }

    exam.questions.push(question);
    await exam.save();
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch question in an exam
router.get('/:examId/questions', async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json({ questions: exam.questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to update a question in an exam
router.put('/:examId/questions/:questionId', async (req, res) => {
  try {
    const { examId, questionId } = req.params;
    const { text, options, correctAnswer } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const question = exam.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.text = text;
    question.options = options;
    question.correctAnswer = correctAnswer;

    await exam.save();
    res.json({ message: 'Question updated successfully' });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a question from an exam
router.delete('/:examId/questions/:questionId', async (req, res) => {
  try {
    const { examId, questionId } = req.params;

    // Find the exam by ID
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Find the question in the exam's questions array and remove it
    const questionIndex = exam.questions.findIndex(q => q._id.toString() === questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }

    exam.questions.splice(questionIndex, 1); // Remove the question
    await exam.save(); // Save the exam

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/start/:id', async (req, res) => {
  try {
    const examId = req.params.id;

    // Find the exam by ID
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if the exam is already started
    if (exam.status === 'ongoing') {
      return res.status(400).json({ message: 'Exam is already started' });
    }

    // Update the exam status to 'started'
    exam.status = 'ongoing';
    await exam.save();

    res.status(200).json({ message: 'Exam started successfully', exam });
  } catch (error) {
    console.error('Error starting exam:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/:examId/save', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    let userExam = await UserExam.findOne({ userId, examId: req.params.examId });

    if (!userExam) {
      userExam = new UserExam({ userId, examId: req.params.examId, answers, isSubmitted: false });
    } else {
      userExam.answers = answers;
    }

    // Calculate correct and incorrect answers
    const exam = await Exam.findById(req.params.examId);
    const correctAnswers = exam.questions.filter((q, index) => q.correctOption === answers[index]).length;
    const incorrectAnswers = exam.questions.length - correctAnswers;
    const percentage = (correctAnswers / exam.questions.length) * 100;

    userExam.correctAnswers = correctAnswers;
    userExam.incorrectAnswers = incorrectAnswers;
    userExam.percentage = percentage;

    await userExam.save();
    res.json({ message: 'Exam saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:examId/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    let userExam = await UserExam.findOne({ userId, examId: req.params.examId });

    if (!userExam) {
      userExam = new UserExam({ userId, examId: req.params.examId, answers, isSubmitted: true });
    } else {
      userExam.answers = answers;
      userExam.isSubmitted = true;
    }

    // Calculate correct and incorrect answers
    const exam = await Exam.findById(req.params.examId);
    const correctAnswers = exam.questions.filter((q, index) => q.correctOption === answers[index]).length;
    const incorrectAnswers = exam.questions.length - correctAnswers;
    const percentage = (correctAnswers / exam.questions.length) * 100;

    userExam.correctAnswers = correctAnswers;
    userExam.incorrectAnswers = incorrectAnswers;
    userExam.percentage = percentage;

    await userExam.save();
    res.json({ message: 'Exam submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});
router.get("/userexams/:userId", async (req, res) => {
  try {
    const userExams = await UserExam.find({ userId: req.params.userId });
    res.json(userExams);
  } catch (err) {
    console.error("Failed to fetch user exams", err);
    res.status(500).json({ message: "Failed to fetch user exams" });
  }
});
// Route to get exam data for a specific user and exam
router.get('/userexams/:userId/:examId', async (req, res) => {
  const { userId, examId } = req.params;

  try {
    // Find the specific user exam entry
    const userExam = await UserExam.findOne({ userId, examId });

    if (!userExam) {
      return res.status(404).json({ message: 'User exam not found' });
    }

    res.json(userExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
