const express = require("express");
const employeeController = require("../Controllers/employeeController");
//const multer = require("multer");
const router = express.Router();
const passportManager = require("../Utils/passportCofig");
const {
  addEmployeeValidation,
} = require("../Utils/Validation/employee.validation");

const AppError = require("../Utils/errorHandling");

const joi = require("joi");

/*
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "--" + file.originalname);
  },
});
const upload = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: 1024 * 1024 * 5, // Max allowed Size is 5MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      logger.error("Only images are allowed");
      return cb(new AppError(400, "Invalid File", "Only images are allowed"));
    }
  },
}).single("image");
*/

router.post("/login" ,employeeController.login);

router.post(
  "/createUser",
  //addEmployeeValidation,
  //upload,
  employeeController.newUser
);

router.get(
  "/getAllUsers",
  // passportManager.authenticate,
  employeeController.getAllUsers
);

router.delete(
  "/deleteUser/:id",
  // passportManager.authenticate,
  employeeController.deleteUser
);

router.get(
  "/getUser/:id",
  // passportManager.authenticate,
  employeeController.getUser
);

router.get(
  "/getAllEmps",
  // passportManager.authenticate,
  employeeController.getAllEmps
);


router.put(
  "/updateUser/:id",
  //addEmployeeValidation,
  // passportManager.authenticate ,
  //upload,
  employeeController.updateUser
);

module.exports = router;
