import  Chat  from "../models/chats-modals.js";
import  Conversation  from "../models/Conversetion.js";
import User from '../models/users_modals.js'
import mongoose from "mongoose";

export const createChat = async (req, res) => {
  try {
    const userId = req.params.id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//localhost:8080/api/chat/all/678b783928304057a25b4f2a
export const getAllChats = async (req, res) => {
 
  const userId = JSON.parse(req.params.id);
  // console.log(" userId", userId)
  
  try {
    
    // Assuming "id" is the field in the collection to filter by (e.g., "userId")
    const chats = await Chat.find({user:userId});
  
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });
     
      console.log(chat)
    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
      role:req.body.role
    });
    
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    succes:false
    });
  }
};

export const getConversation = async (req, res) => {
   
   const Id = req.params.id
  try {
    const conversation = await Conversation.find({ chat: Id }).sort({ createdAt: 1 });

    if (!conversation)
      return res.status(404).json({
        message: "No conversation with this id",
      });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};