import { Router } from "express";
import { register, login, updateProfile, changePassword } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", auth, updateProfile);
router.put("/password", auth, changePassword);

export default router;