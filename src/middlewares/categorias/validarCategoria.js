export function validateCategoria(req, res, next) {
  const { nombre } = req.body;

  // Validar que el nombre no esté vacío
  if (!nombre || nombre.trim() === "") {
    return res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio." });
  }

  /**
   * Validamos más campos de ser requerido
   */

  // Si todo está bien, pasamos al siguiente middleware o controlador
  next();
}
