import mongoose from "mongoose";

const connectDB = async () => {
  console.log("DEBUG MONGO_URI =", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;
