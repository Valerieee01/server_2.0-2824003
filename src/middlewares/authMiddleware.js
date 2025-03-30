import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;  
  // Validamos si la petición trea un token de autorización 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado" });
  }
  // Extraemos el token de la solicitud
  const token = authHeader.split(" ")[1];  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);    
    // Aquí tendrás todos los datos que firmaste en el token
    req.user = decoded;
    // Pasamos a la siguiente función
    next();
  } catch (error) {    
    console.log(error);
    
    res.status(403).json({ message: "Token inválido o expirado" });
  }
}
