require("dotenv").config();
const { ExtractJwt, Strategy } = require("passport-jwt");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SEC,
};
module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      Admin.findById(payload._id, (err, admin) => {
        if (err) {
          return done(err, null);
        }

        if (admin) {
          admin._doc.role = "admin";
          return done(null, admin);
        } else {
          Doctor.findById(payload._id, (err, doctor) => {
            if (err) {
              return done(err, null);
            }
            if (doctor) {
              doctor._doc.role = "doctor";
              return done(null, doctor);
            } else {
              return done(null, false);
            }
          });
        }
      });
    })
  );
};
