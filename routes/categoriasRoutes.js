const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");
const validarCategoria = require("../middlewares/categorias/validarCategoria");

// Obtener todas las categorías
router.get("/", (req, res) => {
    const categorias = Categoria.getAll();
    res.status(200).json(categorias);
});

// Obtener una categoría por ID
router.get("/:id", (req, res) => {
    const categoria = Categoria.getById(req.params.id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
});

// Crear una nueva categoría
router.post("/", validarCategoria, (req, res) => {
    const categoria = Categoria.create(req.body);
    res.status(201).json(categoria);
});

// Actualizar una categoría
router.put("/:id", validarCategoria, (req, res) => {
    const categoria = Categoria.update(req.params.id, req.body);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
});

// Actualizar parcialmente una categoría
router.patch("/:id", (req, res) => {
    const categoria = Categoria.update(req.params.id, req.body);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
});

// Eliminar una categoría
router.delete("/:id", (req, res) => {
  const { id } = req.params; // id de la categoría que se desea eliminar
  try {
    // Intentamos eliminar una categoria
    const resultado = Categoria.delete(id);
    // Validamos si hay un mensaje de error
    if (resultado.status === 400 || resultado.status === 404) {
      // Si el estado es 400 o 404, retornamos un mensaje de error
      return res.status(resultado.status).json({
        message: resultado.message,
      });
    }
    // Si la categoría se elimina correctamente, retornamos éxito
    return res.status(resultado.status).json({
      message: resultado.message,
    });
  } catch (error) {
    // Si hubo algún error en el proceso, retornamos un mensaje de error general
    return res.status(500).json({
      message: "Hubo un error al procesar la solicitud.",
      error: error.message,
    });
  }
});

module.exports = router;
