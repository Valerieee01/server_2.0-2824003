import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

// Registro de usuario
router.post("/register", register);

// Inicio de sesión
router.post("/login", login);

// Ruta para refrescar el token del usuario autenticado
router.post("/refresh", refreshToken);

// Logout
router.post("/logout", verifyToken, logout);

export default router;
