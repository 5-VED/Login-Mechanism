const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const Employee = require("../Models/Employee");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const passport = require("passport");
const logger = require("../Utils/logger");
const { ReS } = require('../Controllers/errorController');

class passportManager {
  initialize() {
    var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    };

    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        Employee.findOne({ id: jwt_payload._id }, function (err, employee) {
          if (err) {
            logger.error("Some Error Occured While initializing");
            return done(err, false);
          }
          if (employee) {
            logger.info("Succesfully got the Employee");
            done(null, employee);
          } else {
            done(null, false);
          }
        });
      })
    );
    return passport.initialize();
  }

  authenticate(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, employee, info) => {
      if (err) {
        logger.error("An Error Occured Cant Authenticate");
        return next(err);
      }
      if (!employee) {
        if (info.name === "TokenExpiredError") {
          logger.error("Your token is Expired");
          return ReS(res, "Your Token is expired", 400);
        } else {
          logger.info(info.message);
          return ReS(res, info.message, 200);
        }
      }
      next();
    })(req, res, next);
  }
}

module.exports = new passportManager();
