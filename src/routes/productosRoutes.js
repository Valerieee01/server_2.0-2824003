import express from "express";

import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  updatePartialProduct,
  deleteProduct
} from "../controllers/productoController.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", getAllProductos);

// Obtener un producto por ID
router.get("/:id", getProductoById);

// Crear un nuevo producto
router.post("/", createProducto);

router.put("/:id", updateProducto);

// Actualizar un producto
router.patch("/:id", updatePartialProduct);

// Eliminar un producto
router.delete("/:id", deleteProduct);

export default router;