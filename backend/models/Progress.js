const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },       // Topic ka naam
    problemId: { type: String, required: true },   // Problem unique id
    problemName: { type: String },                 // Optional, sirf reference
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Progress", progressSchema);
