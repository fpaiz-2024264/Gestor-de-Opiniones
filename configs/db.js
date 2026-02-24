import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB conectado"))
  .catch((err) => console.log(" Error al conectar MongoDB:", err));