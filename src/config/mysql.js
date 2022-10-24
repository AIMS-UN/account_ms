// Aquí importamos la librería para manejo de bases de datos SQL
const { Sequelize } = require("sequelize");

// Aquí van los datos de la base de datos
const database = process.env.MYSQL_DATABASE;    // El nombre de la base de datos
const username = process.env.MYSQL_USER;        // El nombre del usuario
const password = process.env.MYSQL_PASSWORD;    // La contraseña
const host = process.env.MYSQL_HOST;            // El enlace de acceso
const port = process.env.MYSQL_PORT;            // El enlace de acceso

// Aquí instanciamos el objeto de conexión de la base de datos
const sequelize = new Sequelize({
  database,
  username,         // Se especifican los datos anteriores
  password,
  host,
  port,
  dialect: "mysql", // Y se añade la base de datos que usaremos (ya que hay varias disponibles)
  logging: false,   // Si queremos que se muestren los logs de la base de datos
  pool: {
    max: 5,         // El número máximo de conexiones
    min: 0,         // El número mínimo de conexiones
    acquire: 30000, // El tiempo máximo de espera para obtener una conexión
    idle: 10000,    // El tiempo máximo de espera para una conexión
  },
});

// Exportamos el objeto de conexión y la función de conexión
module.exports = sequelize;
