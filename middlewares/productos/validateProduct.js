const fs = require("fs");
const path = require("path");

// // Ruta del archivo JSON
const dbPath = path.join(__dirname, "../../db.json");

// console.log(dbPath);


module.exports = (req, res, next) => {  
  // console.log("Datos recibidos en el middleware:", req.body);
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const { nombre, categoria_id, descripcion } = req.body;
    // Validamos que el campo nombre tenga datos, sea un string y sea direnete de null
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        error: "El campo 'nombre' es obligatorio y no puede estar vacío",
      });
    }
    // Validamos que el campo descripcion tenga datos, sea un string y sea direnete de null
    if (
      !descripcion ||
      typeof descripcion !== "string" ||
      descripcion.trim() === ""
    ) {
      return res.status(400).json({
        error: "El campo 'descripcion' es obligatorio y no puede estar vacío",
      });
    }
    // Validamos el campo categoria_id
    if (!categoria_id) {
      return res.status(400).json({
        error: "El campo categoria_id es obligatorio",
      });
    }
    // Leer el archivo db.json
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const categorias = dbData.categorias || [];

    // Validar si el categoria_id existe en la base de datos
    const categoriaExiste = categorias.some(
      (cat) => cat.id === parseInt(categoria_id)
    );
    if (!categoriaExiste) {
      return res
        .status(400)
        .json({ error: "El categoria_id no existe en la base de datos." });
    }
    // console.log("Pasa todas las validaciones");
  }  
  next(); // Pasar al siguiente middleware o al router
};

