const jwt = require("jsonwebtoken");

const checkValidUser = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userID } = decoded;
    req.username = username;
    req.userID = userID;
    next();
  } catch (err) {
    next("Authorization failure!");
  }
};

module.exports = checkValidUser;
