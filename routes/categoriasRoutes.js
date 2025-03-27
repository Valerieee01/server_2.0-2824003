const express = require("express");
const jsonServer = require("json-server");
const router = express.Router();
const validateCategory = require("../middlewares/categorias/validateCategory");
const validarEliminarCategoria = require("../middlewares/categorias/deleteCategory");

// Instancia del router de JSON Server
const jsonRouter = jsonServer.router("db.json");

// Middleware de validación SOLO para POST, PUT y PATCH
router.post("/", validateCategory);
router.put("/:id", validateCategory);
router.patch("/:id", validateCategory, (req, res, next) => next());
// Ruta para eliminar una categoría (usando middleware)
router.delete("/:id", validarEliminarCategoria, (req, res) => {
  return res.json({
    mensaje: "Categoría eliminada correctamente",
    categoriaEliminada: req.categoriaEliminada
  });
});


// Redirigir operaciones al router de JSON Server
router.use((req, res, next) => {
  // console.log(`Método: ${req.method} | URL: ${req.originalUrl} -> ${req.url}`);
  req.url = `/categorias${req.url}`;
  // console.log(req.url);  
  jsonRouter.handle(req, res, next);
});

module.exports = router;
