// Importamos el verificador de tokens
const { verifyToken } = require("../utils/handleJWT");

// Importamos el modelo del usuario
const userModel = require("../models/users");

// Función de autenticación entre rutas
async function authMiddleware(req, res, next) {
  try {
    // Se necesita que el Header de la petición tenga el token de autorización
    if (!req.headers.authorization) {
      res.send({ error: "NOT_TOKEN_FOUND" });
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken.username) {
      res.send({ error: "NOT_USERNAME_FOUND" });
      return;
    }

    const user = await userModel.findOne({
      where: { username: username },
    });

    req.user = user;
    next();
  } catch (e) {
    res.send({ error: "Error de autenticación" });
  }
}

module.exports = authMiddleware;
