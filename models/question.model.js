const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is required"],
    },

    description: {
      type: String,
      required: [true, "the description is required"],
      minlength: [10, "Firstname must be more than 4 characters"],
    },
    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response",
      },
    ],

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
questionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Question", questionSchema);
