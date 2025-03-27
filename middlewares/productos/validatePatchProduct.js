const fs = require("fs");

const validarActualizarProducto = (req, res, next) => {
  try {
    const rawData = fs.readFileSync("db.json", "utf8");
    const data = JSON.parse(rawData);

    if (!data.productos) {
      return res
        .status(500)
        .json({ error: "No se encontraron productos en la base de datos" });
    }

    const productoId = parseInt(req.params.id);
    const productoIndex = data.productos.findIndex((p) => p.id === productoId);

    if (productoIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Validamos si el campo categoría_id existe en la base de datos
    if (req.body.categoria_id) {
      const categoriaExiste = data.categorias.some(
        (c) => c.id === req.body.categoria_id
      );
      if (!categoriaExiste) {
        return res
          .status(400)
          .json({ error: "La categoría especificada no existe" });
      }
    }

    // Guardamos el índice y los datos actuales del producto en la solicitud
    req.productoIndex = productoIndex;
    req.productos = data.productos;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error al validar el producto" });
  }
};

module.exports = validarActualizarProducto;
