const { employee } = require("./employee.schema");

module.exports = {
  addEmployeeValidation: async (req, res, next) => {
    console.log("123456:: ", req.body);
    const value = await employee.validate(req.body);
    if (value.error) {
      res.json({
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
