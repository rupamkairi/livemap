import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to database.");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();

export default mongoose;
