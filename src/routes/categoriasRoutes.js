import express from "express";
import { validateCategoria } from "../middlewares/categorias/validarCategoria.js";
import {
  createCategoria,
  deleteCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
} from "../controllers/categoriaController.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", getAllCategorias);

// Obtener una categoría por ID
router.get("/:id", getCategoriaById);

// Crear una nueva categoría
router.post("/", validateCategoria, createCategoria);

// Actualizar una categoría
router.put("/:id", updateCategoria);

// Actualizar parcialmente una categoría
router.patch("/:id", updateCategoria);

// Eliminar una categoría
router.delete("/:id", deleteCategoria);

export default router;
