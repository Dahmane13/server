var express = require("express");
const {
  adminLogin,
  initAdmin,
  doctorLogin,
} = require("../controllers/auth.controller");
const { userAuth, isDoctor, isAdmin } = require("../middlewares/Auth");
var router = express.Router();

router.get("/admin/init", initAdmin);
router.post("/admin/login", adminLogin);
router.post("/doctor/login", doctorLogin);

module.exports = router;
