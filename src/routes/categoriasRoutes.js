import express from "express";
import { validateCategoria } from "../middlewares/categorias/validarCategoria.js";
import CategoriaController from "../controllers/CategoriaController.js";

const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las categorías
router.get("/", CategoriaController.getAllCategorias);

// Obtener una categoría por ID
router.get("/:id", CategoriaController.getCategoriaById);

// Crear una nueva categoría
router.post("/", validateCategoria, CategoriaController.createCategoria);

// Actualizar una categoría
router.put("/:id", CategoriaController.updateCategoria);

// Actualizar parcialmente una categoría
router.patch("/:id", CategoriaController.updateCategoria);

// Eliminar una categoría
router.delete("/:id", CategoriaController.deleteCategoria);

export default router;
