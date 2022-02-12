const { required } = require("joi");
const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  DateOfBirth: {
    type: String,
    required: true,
    trum: true,
  },
  DateOfJoin: {
    type: String,
    required: true,
    trim: true,
  },
  Designation: {
    type: String,
    required: true,
    trim: true,
  },
});

//employeeSchema.plugin(mongoosePaginate);

// employeeSchema.index({ firstname: 1 });
const Employee = mongoose.model("employees", employeeSchema); //meaning of new model ?
module.exports = Employee;

//Encrypting the password
// employeeSchema.pre("save", async function (next) {
//   console.log(password);
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 12);
//   this.confirmPassword = undefined;
//   next();
// });
