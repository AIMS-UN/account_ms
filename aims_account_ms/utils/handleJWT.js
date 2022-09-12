
// Importar librería de JWToken
const jwt = require("jsonwebtoken");

// Importamos la clave secreta de JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Aquí se genera la firma del Token
async function tokenSign(user) {
    return jwt.sign(
        {
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

// Aquí se verifica el token
async function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (e) {
        return null;
    }
}

//Exportaremos los métodos
module.exports = { tokenSign, verifyToken };