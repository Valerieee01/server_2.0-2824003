// db.js
import mysql from "mysql2/promise";

// Configuración de la conexión
const connection = await mysql.createConnection({
  host: "localhost",
  user: "node_js",
  password: "Aprendiz2024",
  database: "node_sena",
});

export default connection;
