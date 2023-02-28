require("dotenv").config();
const Doctor = require("../models/doctor.model");
const Specialty = require("../models/specialty.model");
const Address = require("../models/address.model");
const Bio = require("../models/biography.model");
const CryptoJs = require("crypto-js");
const { makeId } = require("../utils/usefullFunc");
const Biography = require("../models/biography.model");
const ObjectId = require("mongoose").Types.ObjectId;

const geAllDoctors = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      select: "-password",
    };
    const doctors = await Doctor.paginate({}, options);
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const doctor = await Doctor.findById(req.params.id)
        .select("-password")
        .populate(["bio", "address", { path: "specialty", select: "title" }]);
      doctor
        ? res.status(200).json({ doctor })
        : res.status(404).json({ msg: "cant find a doctor with this id" });
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addDoctor = async (req, res) => {
  console.log(req.body);
  try {
    const specialty = await Specialty.findById(req.body.specialty);
    if (specialty) {
      const address = new Address({
        title: req.body.address.title,
        latitude: req.body.address.latitude,
        longitude: req.body.address.longitude,
      });
      const password = CryptoJs.AES.encrypt(
        makeId(8),
        process.env.PASS_SEC
      ).toString();
      const bio = new Biography();
      const doctor = new Doctor({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        specialty: specialty._id,
        address: address._id,
        bio: bio._id,
        password,
      });
      await bio.save();
      await address.save();
      await doctor.save();
      res.status(201).json({ msg: "created successfully", doctor });
    } else {
      res.status(404).json({ error: "cant find the specialty" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (req.body.specialty) {
      const specialty = await Specialty.find({
        _id: req.body.specialty,
      });
      if (specialty) {
        await doctor.update({
          specialty: specialty._id,
        });
      }
    }
    if (req.body.address) {
      await Address.findByIdAndUpdate(doctor.address, req.body.address);
    }
    await doctor.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
    });

    res.status(200).json({ msg: "doctor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const doctor = await Doctor.findById(req.params.id);
      if (doctor) {
        await doctor.delete();
        res.status(200).json({ msg: "doctor deleted successfully" });
      } else {
        res.status(404).json({ msg: "cant find a doctor with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  geAllDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
