const passport = require("passport");
const userAuth = passport.authenticate("jwt", { session: false });
const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
const isAdmin = (req, res, next) => {
  const user = req.user;
  console.log(user._doc);
  if (user && user._doc.role === "admin") {
    next();
  } else {
    res.status(401).json("you are not authenticated!");
  }
};
const isDoctor = (req, res, next) => {
  const user = req.user;
  if (user && user._doc.role === "doctor") {
    next();
  } else {
    res.status(401).json("you are not authenticated!");
  }
};
module.exports = { userAuth, isAdmin, isDoctor };
