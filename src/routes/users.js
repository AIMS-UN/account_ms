// Importamos la librería de entorno de Express
const express = require("express");

// Creamos el redireccionador
const router = express.Router();

// Aquí traemos todas las funciones que hicimos en el controlador
const { getUser } = require("../controllers/users");

// Aquí traemos el autenticador
const authMiddleware = require("../middleware/session");

// Aquí traemos los validadores que hicimos
const { checkUsername } = require("../validators/users");

// Aquí colocas el listado de todas las funciones con sus rutas
router.get("", authMiddleware, checkUsername, getUser); // Para colocar variables, utiliza /:var1/:var2

// Exportamos el redireccionador
module.exports = router;
