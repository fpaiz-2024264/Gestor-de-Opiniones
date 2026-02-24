import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createComment, getComments, getCommentById, updateComment, deleteComment } from "./comment.controller.js";

const router = Router();

router.post("/", auth, createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

export default router;