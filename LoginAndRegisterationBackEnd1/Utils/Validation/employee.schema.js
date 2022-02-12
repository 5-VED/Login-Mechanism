const joi = require("joi");

const Schema = {
  employee: joi.object({
    firstname: joi.string().max(100).required(),
    lastname: joi.string().max(100).required(),
    gender: joi.string().valid('Male', 'Female', 'Other').required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required(),
    confirmPassword: joi.any().valid(joi.ref("password")).required(),
    //image: joi.string().required(),
    DateOfBirth: joi.string().max(15).required(),
    DateOfJoin: joi.string().max(15).required(),
    Designation: joi.string().max(25).required(),
  }),
};

module.exports = Schema;
// const Schema = {
//   body: {
//     firstname: joi.string().max(100).required(),
//     lastname: joi.string().max(100).required(),
//     gender: joi.string().valid("Male", "Female", "Other").required(),
//     email: joi.string().email().required(),
//     password: joi.string().min(3).max(15).required(),
//     confirmPassword: joi.any().valid(joi.ref("password")).required(),
//     DateOfBirth: joi.string().max(15).required(),
//     DateOfJoin: joi.string().max(15).required(),
//     Designation: joi.string().max(25).required(),
//   },
//   image: joi.string().required(),
// };



//https://www.youtube.com/watch?v=F-1GD_F8jHg&list=LL&index=2&t=52s&ab_channel=TechnicalBabaji
