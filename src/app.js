// Inicialente, importamos las librerías de entorno de Express y CORS
require('dotenv').config(); // Esta es para las variables de entorno
const express = require('express'); // Esta es la librería de Express
const CORS = require('cors'); // Esta es la librería de CORS
const morgan = require('morgan'); // Esta es la librería Morgan para las peticiones
const accountLDAP = require('./config/ldap'); // Esta es para el LDAP

// Este es el puerto por donde accederemos
const port = process.env.PORT; // Aquí el puerto se encuentra en el archivo .env

// Este es la aplicación base de Express
const app = express();

// Aquí obtenemos la conexión a la base de datos de MySQL
const { loadDatabase } = require('./config/mysql');

// Aquí le informaremos a la aplicación de Express que utilizará
app.use(CORS());

// Aquí activamos la opción de lectura de POSTs de Express
app.use(express.json());

// Aquí activamos la opción de loggeo de Morgan
app.use(morgan('dev'));

// Ahora vamos a invocar a las rutas
app.use('/accounts', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Aquí se va a cargar la base de datos
loadDatabase();
accountLDAP.createOrganization();

// Aquí la aplicación iniciará la escucha en el puerto que le colocamos
// Esta función sería como el main del servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en https://localhost:${port}`);
});
