const Employee = require("../Models/Employee");
const base = require("./baseController");

exports.newUser = base.createOne(Employee);
exports.deleteUser = base.deleteOne(Employee); // Delete Api is Pending
exports.getUser = base.getOne(Employee);
exports.getAllUsers = base.getAll(Employee);
exports.getAllEmps = base.getAllEmployees(Employee);
exports.updateUser = base.updateOneUser(Employee);
exports.login = base.signIn(Employee);