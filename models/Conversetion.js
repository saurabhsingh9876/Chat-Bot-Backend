import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
       required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Conversation", schema);

