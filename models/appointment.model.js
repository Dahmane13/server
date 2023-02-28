const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const visitSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },
    description: {
      type: String,
      required: [true, "the description is required"],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
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
