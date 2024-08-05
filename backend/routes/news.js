const express = require("express");
const News = require("../models/News");

const router = express.Router();

// Add news
router.post("/addnews", async (req, res) => {
  const { title, description } = req.body;
  const newNews = new News({ title, description });

  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing news
router.put("/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete news
router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
