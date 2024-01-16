import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { accessChat, createGroupChat, fetchChat } from "../controllers/chatController.js";

const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, fetchChat);
router.route('/group').post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

export default router;