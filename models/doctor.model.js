const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const doctorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: [4, "Firstname must be more than 4 characters"],
      maxlength: [20, "Firstname must be less than 20 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      minlength: [4, "Lastname must be more than 4 characters"],
      maxlength: [20, "Lastname must be less than 20 characters"],
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender must be specified"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "The phone number is required"],
      match: [
        /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
        "Please fill a valid phone number",
      ],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "The address is required"],
    },
    bio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Biography",
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
    password: { type: String, required: [true, "The password is required"] },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);
doctorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Doctor", doctorSchema);
