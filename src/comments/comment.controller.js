import Comment from "./comment.model.js";



export const createComment = async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      post: req.body.post,      
      author: req.user.id
    });

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear comentario", error });
  }
};



export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "username")
      .populate("post", "title");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener comentarios", error });
  }
};


export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("author", "username")
      .populate("post", "title");

    if (!comment)
      return res.status(404).json({ msg: "Comentario no encontrado" });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener comentario", error });
  }
};


export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ msg: "Comentario no encontrado" });

    if (comment.author.toString() !== req.user.id)
      return res.status(403).json({ msg: "No autorizado" });

    comment.content = req.body.content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar comentario", error });
  }
};



export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ msg: "Comentario no encontrado" });

    if (comment.author.toString() !== req.user.id)
      return res.status(403).json({ msg: "No autorizado" });

    await comment.deleteOne();
    res.json({ msg: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar comentario", error });
  }
};