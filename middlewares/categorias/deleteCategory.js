const fs = require("fs");

const validarEliminarCategoria = (req, res, next) => {
  try {
    const rawData = fs.readFileSync("db.json", "utf8");
    const data = JSON.parse(rawData);

    if (!data.categorias) {
      return res
        .status(500)
        .json({ error: "No se encontraron categorías en la base de datos" });
    }

    const categoriaId = parseInt(req.params.id);
    const categoriaIndex = data.categorias.findIndex(
      (c) => c.id === categoriaId
    );

    if (categoriaIndex === -1) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Verificar si hay productos asociados a esta categoría
    if (data.productos) {
      const productosAsociados = data.productos.some(
        (p) => p.categoria_id === categoriaId
      );
      if (productosAsociados) {
        return res
          .status(400)
          .json({
            error:
              "No se puede eliminar la categoría porque tiene productos asociados",
          });
      }
    }

    // Guardamos la categoría eliminada antes de quitarla de la lista
    req.categoriaEliminada = data.categorias.splice(categoriaIndex, 1)[0];

    // Guardamos los cambios en db.json
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

    next(); // Pasamos la ejecución al siguiente middleware o manejador de ruta
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = validarEliminarCategoria;
