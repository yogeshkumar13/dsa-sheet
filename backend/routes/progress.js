const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const auth = require("../middleware/auth");

// GET all progress for user
router.get("/reports", auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST / save or update
router.post("/", auth, async (req, res) => {
  const { topic, problemId, problemName, completed } = req.body;

  try {
    let prog = await Progress.findOne({
      userId: req.user.id,
      topic,
      problemId
    });

    if (prog) {
      // update
      prog.completed = completed;
      await prog.save();
    } else {
      // create
      prog = await Progress.create({
        userId: req.user.id,
        topic,
        problemId,
        problemName,
        completed
      });
    }

    res.json({ message: "Progress saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
