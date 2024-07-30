import express from "express";
import { login, signup, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated, updateProfile)

export default router;
