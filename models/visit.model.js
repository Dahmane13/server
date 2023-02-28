const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const visitSchema = new mongoose.Schema(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },

    workingDays: [
      {
        type: Number,
        min: [1, "minimum day is 1"],
        max: [7, "maximum day is 7"],
      },
    ],
    start: {
      type: Date,
      required: [true, "the start time is required"],
    },

    finish: {
      type: Date,
      required: [true, "the finish time is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);
visitSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Visit", visitSchema);
