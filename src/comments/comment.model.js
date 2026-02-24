import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  author: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default model("Comment", commentSchema);