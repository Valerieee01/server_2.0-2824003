import express from "express";

import ProductoController from "../controllers/ProductoController.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", ProductoController.getAllProductos);

// Obtener un producto por ID
router.get("/:id", ProductoController.getProductoById);

// Crear un nuevo producto
router.post("/", ProductoController.createProducto);

router.put("/:id", ProductoController.updateProducto);

// Actualizar un producto
router.patch("/:id", ProductoController.updatePartialProduct);

// Eliminar un producto
router.delete("/:id", ProductoController.deleteProduct);

export default router;