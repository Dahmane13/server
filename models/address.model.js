const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const addressSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is required"],
    },

    latitude: {
      type: Number,
      required: [true, "the latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "the longitude is required"],
    },
  },
  { timestamps: true }
);
addressSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Address", addressSchema);
