import AuthService from "../services/authService.js";

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  
  try {
    const response = await AuthService.register(nombre, email, password);
    if (response.error) {
      return res.status(response.code).json(response);
    } else {
      return res.status(response.code).json(response);
    }    
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await AuthService.login(email, password);
    if (response.error) {
      return res.status(response.code).json(response);
    } else {
      return res.status(response.code).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    // Llamamos el servio y pasamos el id del usuario
    const response = await AuthService.logout(req.user.id);
    // Respondemos al cliente con un mensaje
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export const refreshToken = async (req, res) => {  
  // Asiganmos el token a una variable
  const authHeader = req.headers.authorization;
  try {
    const refreshToken = authHeader.split(" ")[1];    
    // Verificamos el token de accesso
    const response = await AuthService.verifyAccessToken(refreshToken);
    return res.status(response.code).json(response);
    // console.log(response);
  } catch (error) {    
    res.status(500).json({ message: "Error en el servidor" });
  }
};