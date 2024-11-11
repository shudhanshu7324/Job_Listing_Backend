const express = require('express')
const app = express();
const env = require('dotenv')
env.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on PORT ",PORT)
})