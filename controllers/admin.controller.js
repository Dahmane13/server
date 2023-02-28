require("dotenv").config();
const Patient = require("../models/patient.model");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const sendEmail = require("../utils/mailer");
const ObjectId = require("mongoose").Types.ObjectId;
const CryptoJs = require("crypto-js");

const getAllAdmins = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const admins = await Admin.paginate({}, options);
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAdminById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const admin = await Admin.findById(req.params.id);
      admin
        ? res.status(200).json({ admin })
        : res.status(404).json({ msg: "cant find a admin with this id" });
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addAdmin = async (req, res) => {
  try {
    const pass = makeId(8);
    const password = CryptoJs.AES.encrypt(
      pass,
      process.env.PASS_SEC
    ).toString();
    const admin = new Admin({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      password,
    }).save();
    res.status(201).json({ msg: "created successfully", review });
    await sendEmail(
      admin.email,
      "Account info",
      `Welcome here it is your password:${password}`
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateAdmin = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const admin = await Admin.findById(req.params.id);
      if (admin) {
        if (req.body.password) {
          const oldPassword = req.body.oldPassword;
          const originalPassword = CryptoJs.AES.decrypt(
            admin.password,
            process.env.PASS_SEC
          ).toString(CryptoJs.enc.Utf8);
          if (oldPassword !== originalPassword) {
            res.status(403).json({ error: "incorrect password" });
          } else {
            await admin.update(req.body);
          }
        }
        await admin.update(req.body);
        res.status(200).json({ msg: "admin updated successfully" });
      } else {
        res.status(404).json({ error: "cant find the admin with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const admin = await Admin.findById(req.params.id);
      if (admin) {
        await admin.delete();
        res.status(200).json({ msg: "admin deleted successfully" });
      } else {
        res.status(404).json({ msg: "cant find a admin with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
