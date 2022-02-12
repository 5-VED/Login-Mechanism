/* eslint-disable */

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const { ReS } = require("../Controllers/errorController");
const logger = require("./logger");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const AppError = require("./errorHandling");

dotenv.config({
  path: "./config.env",
});

class mail {
  async sendMail(receiver,details) {
    const transporter = nodemailer.createTransport({
      host: "smpt.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL1,
        pass: process.env.PASSWORD1,
      },
    });

    const filePath = path.join(__dirname, "../Public/index.ejs");
    console.log(filePath);

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        //Step 2 Create Mail Options
        let mailOptions = {
          from: process.env.EMAIL1,
          to: receiver,
          subject: "Testing",
          html: ejs.render(data, details),
        };

        //Step 3 Send the Mail
        transporter.sendMail(mailOptions, function (err, info, res) {
          if (err) {
            logger.error("Failed to Send Mail");
            throw new AppError(400, "Failed to Send Mail", err);
          } else {
            logger.info("Email Sent Succesfully");
            console.log("Mail sent succesfully: " + info.response);
          }
        });
      }
    });
  }
}

module.exports = new mail();
