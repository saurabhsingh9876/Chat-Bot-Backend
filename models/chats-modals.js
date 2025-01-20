import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false,
  },
  user: {
    type: String,  // Change to String to store just the userId (as a string)
    required: true,
  },
});

export default mongoose.model("Chats", chatSchema);
