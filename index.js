import app from "./configs/app.js";
import "./configs/db.js";

import userRoutes from "./src/users/user.routes.js";
import postRoutes from "./src/posts/post.routes.js";
import commentRoutes from "./src/comments/comment.routes.js";

// Rutas principales
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Puerto desde .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});