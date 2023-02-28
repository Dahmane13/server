var express = require("express");
const {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

var router = express.Router();

router.get("/patient", getAllPatients);
router.get("/patient/:id", getPatientById);
router.post("/patient", addPatient);
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

module.exports = router;
