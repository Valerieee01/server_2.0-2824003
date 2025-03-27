import express from "express";
// import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import productoRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";

// Crear la instancia de Express
const app = express();
// Middleware
// Habilita CORS
app.use(cors()); 
// Permite que la app acepte datos JSON
app.use(bodyParser.json()); 
// app.use(express.json());
// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({ extended: true }));
// Rutas
app.use('/api/productos', productoRoutes);
app.use("/api/categorias", categoriasRoutes);

// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});