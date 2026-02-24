import Post from "./post.model.js";

export const createPost = async (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !content)
    return res.status(400).json({ msg: "Campos obligatorios" });

  const post = new Post({
    title,
    category,
    content,
    author: req.user.id
  });

  await post.save();
  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
};
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");

    if (!post) return res.status(404).json({ msg: "Post no encontrado" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener post" });
  }
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ msg: "No autorizado" });

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ msg: "No autorizado" });

  await post.deleteOne();
  res.json({ msg: "Post eliminado" });
};