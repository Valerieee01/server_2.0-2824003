module.exports = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res
      .status(400)
      .json({ error: "El nombre de la categoría es obligatorio" });
  }

  next(); // Si la validación pasa, continúa con la ejecución de la ruta
};
