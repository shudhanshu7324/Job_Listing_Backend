const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const userRouter = require('./routes/user')
const jobRouter = require('./routes/job')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/user',userRouter)
app.use('/api/job',jobRouter)

app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected sucessfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
