var express = require("express");
const {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

var router = express.Router();

router.get("/admin", getAllAdmins);
router.get("/admin/:id", getAdminById);
router.post("/admin", addAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

module.exports = router;
