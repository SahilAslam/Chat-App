import express from "express"
import { protect } from "../middlewares/authMiddleware";
import { allMessages, sendMessage } from "../controllers/messageControllers";

const router = express.Router();

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

export default router;