// Importamos el verificador de tokens
const { verifyToken } = require("../utils/handleJWT");

// Función de autenticación entre rutas
async function authMiddleware(req, res, next) {
  try {
    // Se necesita que el Header de la petición tenga el token de autorización
    if (req.headers.authorization == null) {
      res.status(401).send({ error: "NOT_TOKEN_FOUND" });
      return;
    }

    const token = req.headers.authorization.split(" ").pop();   // Se separa ya que es: Bearer {Token}
    const { id } = await verifyToken(token);                    // Aquí se saca el ID del usuario del token.

    res.locals.userID = id;
    next();
  } catch (e) {
    res.status(403).send({ error: "UNVALID_TOKEN" });
  }
}

module.exports = authMiddleware;
