import User from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || password.length < 6)
    return res.status(400).json({ msg: "Datos inválidos" });

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(400).json({ msg: "Usuario ya existe" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashed });
  await user.save();

  res.json({ msg: "Usuario creado" });
};

// Login
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  });

  if (!user) return res.status(404).json({ msg: "Usuario no existe" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
};

// Editar perfil
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.username = req.body.username || user.username;
  await user.save();
  res.json({ msg: "Perfil actualizado" });
};

// Cambiar contraseña
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ msg: "Contraseña actualizada" });
};