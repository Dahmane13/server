require("dotenv").config();

const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");

const initAdmin = async (req, res) => {
  const password = CryptoJs.AES.encrypt(
    "admin",
    process.env.PASS_SEC
  ).toString();
  try {
    const admin = await Admin.create({
      firstname: "admin",
      lastname: "admin",
      gender: "male",
      phone: "0555555557",
      email: "admin@admin.com",
      password,
    });
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
    });
    if (!admin) {
      res.status(404).json({ error: "cant find admin with this email" });
    } else {
      const originalPass = CryptoJs.AES.decrypt(
        admin.password,
        process.env.PASS_SEC
      ).toString(CryptoJs.enc.Utf8);
      if (originalPass != req.body.password) {
        res.status(403).json({ error: "wrong password try again" });
      } else {
        const { password, ...rest } = admin._doc;
        const accessToken = jwt.sign(
          {
            id: admin._id,
            email: admin.email,
            role: "admin",
          },
          process.env.PASSPORT_SEC,
          { expiresIn: "4d" }
        );
        res.status(200).json({ admin: rest, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      email: req.body.email,
    });
    if (!doctor) {
      res.status(404).json({ error: "cant find admin with this email" });
    } else {
      const originalPass = CryptoJs.AES.decrypt(
        doctor.password,
        process.env.PASS_SEC
      ).toString(CryptoJs.enc.Utf8);
      if (originalPass != req.body.password) {
        res.status(403).json({ error: "wrong password try again" });
      } else {
        const { password, ...rest } = doctor._doc;
        const accessToken = jwt.sign(
          {
            id: doctor._id,
            email: doctor.email,
            role: "doctor",
          },
          process.env.PASSPORT_SEC,
          { expiresIn: "4d" }
        );
        res.status(200).json({ doctor: rest, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const protectedAuth = async (req, res) => {
//   try {
//     res.status(200).json({ msg: "protected" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
module.exports = {
  adminLogin,
  doctorLogin,
  initAdmin,
};
