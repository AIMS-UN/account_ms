
// Inicialente, importamos las librerías de entorno de Express y CORS
const express = require("express");     // Esta es la librería de Express
const CORS = require("CORS");           // Esta es la librería de CORS
require("dotenv").config();             // Esta es para las variables de entorno

// Este es el puerto por donde accederemos
const port = process.env.PORT;          // Aquí el puerto se encuentra en el archivo .env

// Este es la aplicación base de Express
const app = express();

// Aquí obtenemos la conexión a la base de datos de MySQL
const {dbConnection} = require("./config/mysql");

// Aquí le informaremos a la aplicación de Express que utilizará
app.use(CORS());

// Aquí activamos la opción de lectura de POSTs de Express
app.use(express.json());

// Ahora vamos a invocar a las rutas
app.use("/accounts", require("./routes/users"));
app.use("", require("./routes/auth"));

// Aquí la aplicación iniciará la escucha en el puerto que le colocamos
// Esta función sería como el main del servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en https://localhost:${port}`);
});

// Aquí hará la conexión a la base de datos
dbConnection();

