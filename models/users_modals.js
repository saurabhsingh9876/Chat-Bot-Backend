import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:Number,
      required:false
    }
  },
  { timestamps: true } // Enables createdAt and updatedAt fields
);

export default mongoose.model('User', userSchema);

