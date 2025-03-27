const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");
const validateProduct = require("../middlewares/productos/validateProduct")

// Obtener todos los productos
router.get("/", (req, res) => {
    const productos = Producto.getAll();
    res.status(200).json(productos);
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
    const producto = Producto.getById(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
});

// Crear un nuevo producto
router.post("/", validateProduct, (req, res) => {
    const producto = Producto.create(req.body);
    res.status(201).json(producto);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  const productoActualizado = Producto.update(id, data);
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
})

// Actualizar un producto
router.patch("/:id", (req, res) => {
    const producto = Producto.update(req.params.id, req.body);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
    const resultado = Producto.delete(req.params.id);
    if (resultado) {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(400).json({ message: "Producto no encontrado" });
    }
});

module.exports = router;
