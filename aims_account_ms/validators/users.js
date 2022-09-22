// Importamos la función revisión de Express Validator
const { check } = require("express-validator");

// Importamos la función validadora
const validateResults = require("../utils/handleValidator");

// Colocamos un arreglo con todo lo que queremos revisar utilizando el check
const checkCreateUser = [
  check("username").exists().notEmpty(),
  check("password").exists().notEmpty().isLength({ min: 5 }),
  check("role").exists().notEmpty().isIn(["student", "teacher"]),
  (req, res, next) => validateResults(req, res, next),
];

const checkUsername = [
  check("username").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const checkLogin = [
  check("username").exists().notEmpty(),
  check("password").exists().notEmpty().isLength({ min: 5 }),
  (req, res, next) => validateResults(req, res, next),
];

// Exportamos el arreglo
module.exports = { checkCreateUser, checkUsername, checkLogin };
