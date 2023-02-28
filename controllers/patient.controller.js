require("dotenv").config();
const Patient = require("../models/patient.model");
const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const sendEmail = require("../utils/mailer");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllPatients = async (req, res) => {
  try {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      };
      let query = {};
      if (req.query.doctor) {
        query.doctor = req.query.doctor;
      }
      const patients = await Patient.paginate(query, options);
      res.status(200).json({ patients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {}
};
const getPatientById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const patient = await Patient.findById(req.params.id);
      patient
        ? res.status(200).json({ patient })
        : res.status(404).json({ msg: "cant find a patient with this id" });
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addPatient = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.doctor)) {
      const doctor = await Doctor.findById(req.body.doctor);
      if (doctor) {
        const patient = new Patient({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          age: req.body.age,
          phone: req.body.phone,
          email: req.body.email,
        });

        const appointment = new Appointment({
          doctor: doctor._id,
          patient: patient.id,
          dateTime: req.body.dateTime,
        });
        patient.save();
        appointment.save();
        res.status(201).json({ msg: "created successfully", review });
        await sendEmail(
          patient.email,
          "Appointment info",
          "Appointment has been created successfully"
        );
      } else {
        res.status(404).json({ error: "cant find the doctor with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePatient = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const patient = await patient.findById(req.params.id);
      if (patient) {
        await patient.update(req.body);
        res.status(200).json({ msg: "patient updated successfully" });
      } else {
        res.status(404).json({ error: "cant find the patient with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletePatient = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const patient = await Patient.findById(req.params.id);
      if (patient) {
        await patient.delete();
        res.status(200).json({ msg: "patient deleted successfully" });
      } else {
        res.status(404).json({ msg: "cant find a patient with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
};
