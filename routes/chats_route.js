import express from "express";
import { ensureAuthenticated} from "../middlewares/auth.js";
import {
  addConversation,
  createChat,
  deleteChat,
  getAllChats,
  getConversation,
} from "../controller/chats_conrollers.js";

const router = express.Router();

router.post("/new/:id", createChat);
router.get("/all/:id", getAllChats);
router.post("/:id", addConversation);
router.get("/:id", getConversation);
router.delete("/:id", ensureAuthenticated, deleteChat);

export default router;