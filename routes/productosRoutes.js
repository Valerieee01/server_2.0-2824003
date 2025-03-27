const express = require("express");
const jsonServer = require("json-server");
const router = express.Router();
const validateProduct = require("../middlewares/productos/validateProduct");
const validarEliminarProducto = require("../middlewares/productos/deleteProduct");
const validarActualizarProducto = require("../middlewares/productos/validatePatchProduct");
const fs = require("fs");
// Instancia del router de JSON Server
const jsonRouter = jsonServer.router("db.json");

router.post("/", validateProduct);
router.put("/:id", validateProduct);
router.patch("/:id", validarActualizarProducto, (req, res) => {
  try {
    // Obtenemos los datos actuales del producto
    const producto = req.productos[req.productoIndex];

    // Actualizamos solo los campos enviados en la petición
    Object.assign(producto, req.body);

    // Guardamos los cambios en db.json
    const rawData = fs.readFileSync("db.json", "utf8");
    const data = JSON.parse(rawData);
    data.productos[req.productoIndex] = producto;
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

    return res.json({
      mensaje: "Producto actualizado correctamente",
      productoActualizado: producto,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el producto" });
  }
});
// Middleware de validación antes de eliminar
router.delete("/:id", validarEliminarProducto, (req, res, next) => {
  return res.json({
    mensaje: "Producto eliminado correctamente",
    productoEliminado: req.productoEliminado
  });
});


// Redirigir operaciones al router de JSON Server
router.use((req, res, next) => {
  // console.log(`Método: ${req.method} | URL: ${req.originalUrl} -> ${req.url}`);
  req.url = `/productos${req.url}`;
  // console.log(req.url);  
  jsonRouter.handle(req, res, next);
});

module.exports = router;
