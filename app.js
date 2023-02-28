var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDatabase = require("./db/connection");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var doctorRouter = require("./routes/doctor");
var reviewRouter = require("./routes/review");
var patientRouter = require("./routes/patient");
const passport = require("passport");
var app = express();
connectDatabase();

app.use(passport.initialize());
require("./utils/passport")(passport);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/", authRouter);
app.use("/api/", doctorRouter);
app.use("/api/", reviewRouter);
app.use("/api/", patientRouter);

module.exports = app;
