const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const specialtySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is required"],
    },

    doctor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  { timestamps: true }
);
specialtySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Specialty", specialtySchema);
