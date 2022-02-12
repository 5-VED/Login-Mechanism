const { createLogger, transports, format } = require("winston");

module.exports = createLogger({
  transports: new transports.File({
    filename: "logs/server.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]} : ${info.message}`
      )
    ),
  }),
});
