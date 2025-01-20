import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODM_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connect;
