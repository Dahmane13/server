require("dotenv").config();
const Review = require("../models/review.model");
const Doctor = require("../models/doctor.model");
const ObjectId = require("mongoose").Types.ObjectId;

const getReviews = async (req, res) => {
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
      const reviews = await Review.paginate(query, options);
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {}
};
const getReviewById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const review = await Review.findById(req.params.id);
      review
        ? res.status(200).json({ review })
        : res.status(404).json({ msg: "cant find a review with this id" });
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addReview = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.doctor)) {
      const doctor = await Doctor.findById(req.body.doctor);
      if (doctor) {
        const review = await Review.create({
          description: req.body.description,
          stars: req.body.stars,
          email: req.body.email,
          name: req.body.name,
          doctor: req.body.doctor,
        });
        res.status(201).json({ msg: "created successfully", review });
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
const updateReview = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const review = await Review.findById(req.params.id);
      if (review) {
        await review.update(req.body);
        res.status(200).json({ msg: "doctor updated successfully" });
      } else {
        res.status(404).json({ error: "cant find the review with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const review = await Review.findById(req.params.id);
      if (review) {
        await review.delete();
        res.status(200).json({ msg: "review deleted successfully" });
      } else {
        res.status(404).json({ msg: "cant find a review with this id" });
      }
    } else {
      res.status(500).json({ error: "objectId is invalid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
};
