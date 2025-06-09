const express = require("express");
const connectDB = require("./config/server");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
connectDB();



app.listen(process.env.PORT  || 5000, () => {
  console.log(`Server running on port ${process.env.PORT  || 5000}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
