
// Aquí importamos la librería para manejo de bases de datos SQL
const { Sequelize } = require("sequelize");

// Aquí van los datos de la base de datos
const database = process.env.MYSQL_DATABASE;    // El nombre de la base de datos
const username = process.env.MYSQL_USER;        // El nombre del usuario
const password = process.env.MYSQL_PASSWORD;    // La contraseña
const host     = process.env.MYSQL_HOST;        // El enlace de acceso
const port     = process.env.MYSQL_PORT;        // El enlace de acceso

// Aquí instanciamos el objeto de conexión de la base de datos
const sequelize = new Sequelize(
    database,
    username,               // Se especifican los datos anteriores
    password,
    {
        host: host,
        port: port,
        dialect: "mysql"    // Y se añade la base de datos que usaremos (ya que hay varias disponibles)
    }
);

// Aquí colocamos la función que inicia la conexión con la base de datos
async function dbConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexión correcta con la base de datos");
    }
    catch (e) {
        console.log("Error de conexión con la base de datos", e);
    }
};

// Exportamos el objeto de conexión y la función de conexión
module.exports = {sequelize, dbConnection};