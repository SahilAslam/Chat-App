import express from "express";
import { allUsers, authUser, editUser, registerUser } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);

router.post('/login', authUser);

router.post('/edit', editUser)

export default router;