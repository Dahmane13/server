var express = require("express");
const {
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
var router = express.Router();

router.get("/review", getReviews);
router.get("/review/:id", getReviewById);
router.post("/review", addReview);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);

module.exports = router;
