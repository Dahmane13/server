var express = require("express");
const {
  addDoctor,
  updateDoctor,
  geAllDoctors,
  getDoctorById,
  deleteDoctor,
} = require("../controllers/doctor.controller");

const { userAuth, isDoctor, isAdmin } = require("../middlewares/Auth");
var router = express.Router();

router.get("/doctor", geAllDoctors);
router.get("/doctor/:id", getDoctorById);
router.post("/doctor", addDoctor);
router.put("/doctor/:id", updateDoctor);
router.delete("/doctor/:id", deleteDoctor);

module.exports = router;
