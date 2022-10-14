// Importamos la librería de Express
const express = require("express");
const { matchedData } = require("express-validator");

// Inicializamos el redirigidor
const router = express.Router();

// Aquí traemos todas las funciones que hicimos en el controlador
const { registerUser, loginUser } = require("../controllers/users");

// Aquí traemos los validadores que hicimos
const { checkCreateUser, checkLogin } = require("../validators/users");

// Aquí está la ruta de logeo
router.post("/auth/login", checkLogin, loginUser);

// Aquí está la ruta de registro
router.post("/auth/register", checkCreateUser, registerUser);

module.exports = router;
