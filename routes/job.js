const express = require("express");
const router = express.Router();
const Job = require("../schemas/job.schema");
const User = require("../schemas/user.schema");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newJob = await new Job({
      title,
      description,
      salary,
      location,
      userId: user._id,
    }).save();
    return res
      .status(200)
      .json({ message: "Job created successfully", id: newJob._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
