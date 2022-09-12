
// Importamos la función validadora de Express Validator
const { validationResult } = require("express-validator");

// Esta será la función que valide nuestros resultados
function validateResults(req, res, next) {
    try {
        validationResult(req).throw();          // Aquí evaluará cada revisión si falla, irá al catch
        return next();                          // Aquí continuará al controlador
    }
    catch (e) {
        res.status(403);                        // Enviará el estado de error en caso alguno
        res.send({ errors: e.array() });      // Con los errores encontrados
    }
}

// Exportamos la función validadora
module.exports = validateResults;