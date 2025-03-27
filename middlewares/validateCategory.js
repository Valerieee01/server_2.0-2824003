module.exports = (req, res, next) => {
  // console.log("Datos recibidos en el middleware:", req.body);
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const { nombre } = req.body;
    // console.log("Validando nombre:", nombre);
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      // console.log("Error: El nombre es inválido.");
      return res.status(400).json({
        // error: "El campo 'nombre' es obligatorio y no puede estar vacío",
      });
    }
    // console.log("Nombre válido. Continuando...");
  }
  // Si pasa la validación, continuar con la solicitud
  next();
};
