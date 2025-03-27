const express = require("express");
const jsonServer = require("json-server");
const categoriasRoutes = require("./routes/categoriasRoutes");

const server = express();
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Habilitar el manejo de JSON en el body
server.use(express.json()); 
// Asegurar compatibilidad con URL encoded
server.use(express.urlencoded({ extended: true })); 

// Usar rutas personalizadas
server.use("/api/categorias", categoriasRoutes);

// Usar json-server para el resto de las rutas
const router = jsonServer.router("db.json");
server.use("/api", router);

server.listen(3000, () => {
  console.log("JSON Server corriendo en http://localhost:3000/api");
});
