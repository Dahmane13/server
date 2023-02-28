const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    description: {
      type: String,
      required: [true, "the description is required"],
    },
    stars: {
      type: Number,
      required: [true, "Review stars are required"],
      min: [1, "Minimum review is 1 star"],
      max: [5, "Minimum review is 5 stars"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "Displayname is required"],
      minlength: [4, "Firstname must be more than 4 characters"],
      maxlength: [20, "Firstname must be less than 20 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);
reviewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Review", reviewSchema);
