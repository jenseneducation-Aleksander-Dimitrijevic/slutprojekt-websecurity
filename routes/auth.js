const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return false;
    } else {
      try {
        const verify = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET
        );
        req.user = verify;
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
};
