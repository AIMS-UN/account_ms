
// Llamamos a la librería de cifrados
const bcryptjs = require("bcryptjs");

// Hacemos la función cifrar
async function encrypt(plainPassword, ) {
    return await bcryptjs.hash(plainPassword, 10);
}

// Hacemos la función comparar
async function compare(plainPassword, hashPassword) {
    return await bcryptjs.compare(plainPassword, hashPassword);
}

module.exports = { encrypt, compare };