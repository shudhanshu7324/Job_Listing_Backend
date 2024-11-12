const express = require("express");
const router = express.Router();
const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signin -> user put their credentials -> look for existing user -> if user exists -> tell them email already taken -> if user not exists -> create user -> create a user in mongodb -> send back a jwt token

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exist with email" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await new User({
        email,
        password: hashedPassword,
        name,
        mobile,
      }).save();
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ message: "User created successfully", token, id: newUser._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
      } else {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({ message: "Login successfully", token, id: user._id });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error" });
  }
});

module.exports = router;
