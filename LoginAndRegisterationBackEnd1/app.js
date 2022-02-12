const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const ejs = require('ejs');

//Initialize Express
const app = express();

//Handling Cors
app.use(cors());

//initialize limiter
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "To many request from this IP, Please try again Later",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;

