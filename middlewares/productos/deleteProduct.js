const fs = require("fs");

const validarEliminarProducto = (req, res, next) => {
  try {
    const rawData = fs.readFileSync("db.json", "utf8");
    const data = JSON.parse(rawData);

    if (!data.productos) {
      return res
        .status(500)
        .json({ error: "No se encontraron productos en la base de datos" });
    }

    const productos = data.productos;
    const productoId = parseInt(req.params.id);

    const productoIndex = productos.findIndex((p) => p.id === productoId);

    if (productoIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Guardamos el producto antes de eliminarlo y pasamos los datos a req
    req.productoEliminado = productos.splice(productoIndex, 1)[0];

    // Guardamos los cambios en db.json
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

    next(); // Pasamos al siguiente middleware o manejador de ruta
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = validarEliminarProducto;
