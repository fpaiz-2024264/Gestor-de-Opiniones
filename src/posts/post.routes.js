import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "./post.controller.js";

const router = Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById); 
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;