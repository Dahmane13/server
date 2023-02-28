require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionUrl = process.env.MONGO_URL;
const connectDatabase = async () => {
  try {
    await mongoose
      .connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, // for mongoose 6.x
        // useFindAndModify: false, // for mongoose 6.x
      })
      .then(() => {
        console.log("Connected to MongoDB database successfully.");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
      });
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
};

module.exports = connectDatabase;
