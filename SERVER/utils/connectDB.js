import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB=()=>{
  mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connected to MongoDB Atlas');

  }).catch((err)=>{
    console.log(err);
  })
}

export default connectDB