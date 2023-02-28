const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const addressSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    description: {
      type: String,
      default: null,
    },
    education: [
      {
        img: {
          type: String,
          default: null,
        },
        title: {
          type: String,
          default: null,
        },
      },
    ],
    languages: [
      {
        type: String,
        enum: ["Arabic", "English", "French", "Berber"],
        default: null,
      },
    ],
    awards: [
      {
        img: {
          type: String,
          default: null,
        },
        title: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);
addressSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Biography", addressSchema);
