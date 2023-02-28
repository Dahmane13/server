const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const responseSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "the description is required"],
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);
responseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Response", responseSchema);
