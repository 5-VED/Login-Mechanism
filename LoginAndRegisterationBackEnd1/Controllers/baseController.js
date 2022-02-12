/* eslint-disable */
const fs = require("fs");
const AppError = require("../Utils/errorHandling");
const { ReS } = require("../Controllers/errorController");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({
  path: "./config.env",
});
const logger = require("../Utils/logger");
const mail = require("../Utils/nodemailerConfig");
const { pathToFileURL } = require("url");

//API to delete User
exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      throw new AppError(404, "Bad Request", "Record Does not exist");
    }
    //console.log(doc);
    // fs.unlink(doc.image, (error) => {
    //   if (error) {
    //     logger.error("Cant remove file from folder some error occured");
    //     next(error);
    //   }
    // });
    //await Model.deleteOne({ _id: req.params._id }, doc);
    logger.info("Record Removed Succesfully");
    return ReS(res, "Record Removed Succesfully", 200);
  } catch (error) {
    logger.error("Internale Server Error");
    next(error);
  }
};

//Api to get User
exports.getOne = (Model) => async (req, res, next) => {
  // console.log("doc");
  try {
    const doc = await Model.findById(req.params.id);

    // const q = req.query.q;
    //const doc = await Model.find({ $text: { $search: q } }); // Exact Search     ----//exact Search
    //const doc = await Model.find({ firstname: { $regex: new RegExp(q) } });    ----// Partial Search

    if (doc != undefined || doc != null) {
      /*      const employeeDoc = { 
        firstname: doc[0].firstname,
        lastname: doc[0].lastname,
        gender: doc[0].gender,
        email: doc[0].email,
        password: doc[0].password,
        confirmPassword: doc[0].confirmPassword,
        image: process.env.LINK + doc[0].image,
        DateOfBirth: doc[0].DateOfBirth,
        DateOfJoin: doc[0].DateOfJoin,
        Designation: doc[0].Designation,
      };
      
      const employeeDoc = {
        firstname: doc.firstname,
        lastname: doc.lastname,
        gender: doc.gender,
        email: doc.email,
        password: doc.password,
        confirmPassword: doc.confirmPassword,
        image: process.env.LINK + doc.image,
        DateOfBirth: doc.DateOfBirth,
        DateOfJoin: doc.DateOfJoin,
        Designation: doc.Designation,
      };
      */
      logger.info("Employee Fetched Succesfully");
      return ReS(res, doc, 200);
    } else {
      logger.error("404, Bad Request, Record Does not exist");
      throw new AppError(404, "Bad Request", "Record Does not exist");
    }
  } catch (error) {
    logger.error("Some internal error occured Cannot Get the Employee");
    next(error);
  }
};

//Controller to get all users with pagination and sorting
exports.getAll = (Model) => async (req, res, next) => {
  //console.log("Above try block");
  try {
    //console.log("In Try Block");

    const pageNo = parseInt(req.query.pageNo);
    const perPage = parseInt(req.query.perPage);
    const startIndex = (pageNo - 1) * perPage; //Start index of array
    const endIndex = pageNo * perPage; //End index of array

    const doc = await Model.find();

    if (!doc || doc.length === 0) {
      logger.error("Documents Does not Exist");
      throw new AppError(400, "Bad Request", "No Records Exist");
    } else {
      const pagedoc = doc.slice(startIndex, endIndex);
      console.log(pagedoc);
      logger.info("Documents Fetched Succesfully");
      return ReS(res, pagedoc, 200);
    }
  } catch (error) {
    logger.error("Cant Fetch All records Some Error Occured");
    next(error);
  }
};

exports.getAllEmployees = (Model) => async (req, res, next) => {
  console.log("above try");
  try {
    console.log("here");
    const doc = await Model.find();

    if (!doc || doc.length === 0) {
      logger.error("Get All Apil-- Documents Does not Exist");
      throw new AppError(400, "Bad Request", "No Records Exist");
    } else {
      logger.info("All records fetched Succesfully");
      return ReS(res, doc, 200);
    }
  } catch (error) {
    logger.error("Cant Fetch All records Some Error Occured");
    next(error);
  }
};

//Controller to update a user
exports.updateOneUser = (Model) => async (req, res, next) => {
  try {
    const employee = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      email: req.body.email,
      //image: req.file.path,
      DateOfBirth: req.body.DateOfBirth,
      DateOfJoin: req.body.DateOfJoin,
      Designation: req.body.Designation,
    };

    await Model.findByIdAndUpdate(req.params.id, employee)
      .then((data) => {
        if (!data) {
          logger.error("Employee not found with id " + req.params.id);
          throw new AppError(
            404,
            "Failed",
            "Employee not found with id " + req.params.id
          );
        }
        logger.info("Employee Updated Succesfully");
        ReS(res, data, 200);
      })
      .catch((err) => {
        console.log(err);
        if (err.kind === "ObjectId") {
          logger.error("Employee not found with id " + req.params.id);
          throw new AppError(
            404,
            "Failed",
            "Employee not found with id " + req.params.id
          );
        }
        logger.error("Error updating Employee record with id " + req.params.id);
        throw new AppError(
          500,
          "Failed",
          "Error updating Record with id " + req.params.id
        );
      });
  } catch (error) {
    logger.error("Cant Update Employee Record Some Error Occured");
    next(error);
  }
};

//Login API
exports.signIn = (Model) => async (req, res, next) => {
  try {
    const user = await Model.findOne({ email: req.body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "30s",
        });
        logger.info("User Signed In Succesfully");
        res.send({ user: user._id, token: token });
      } else {
        logger.error("Invalid Credentials Please Enter again");
        throw new AppError(
          400,
          "failed",
          "Invalid Credentials Please Enter again"
        );
      }
    } else {
      logger.error("User Doesnot Exist");
      throw new AppError(400, "Bad Request", "User Doesnot Exist");
    }
  } catch (error) {
    logger.error("Cant Sign in");
    next(error);
  }
};

//API to create User
exports.createOne = (Model) => async (req, res, next) => {
  try {
    const emailExist = await Model.findOne({ email: req.body.email });

    if (!emailExist) {
      //Encrypting Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const doc = await Model.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        //image: req.file.path,
        DateOfBirth: req.body.DateOfBirth,
        DateOfJoin: req.body.DateOfJoin,
        Designation: req.body.Designation,
      });

      doc.save((err, docs) => {
        if (!err) {
          mail.sendMail(doc.email, doc);
          logger.info("Record Saved Succesfully");
          return ReS(res, docs, 201);
        } else {
          logger.error("Error while creating new record");
          throw new AppError(400, "Failed", "Error while creating new record");
        }
      });
    } else {
      logger.error(
        "User with This email already exist please try another email"
      );
      return ReS(
        res,
        "User with This email already exist please try another email",
        400
      );
    }
  } catch (error) {
    console.log("In error block");
    next(error);
  }
};
