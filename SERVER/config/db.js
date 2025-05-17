import mongoose from "mongoose";

const DB = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DB);
    
    if(connection) {
      console.log(`MongoDB Connected Successfully at: ${connection.host}`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
