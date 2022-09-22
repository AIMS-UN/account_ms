// Aquí colocamos la información que usa Sequelize
const sequelize = require("../config/mysql"); // La instancia del objeto de Sequelize
const { DataTypes } = require("sequelize"); // Los tipos de datos de Sequelize

// Aquí definimos el modelo de Usuario
const User = sequelize.define(
  "users", // Este es el nombre de la tabla
  {
    id: {
      // Aquí estarán los listados de atributos de la tabla
      type: DataTypes.INTEGER, // Este es el tipo de dato
      autoIncrement: true, // Si es autoincremental
      primaryKey: true, // Si es la llave primaria
      allowNull: false, // Si se permite valores nulos (por defecto es que sí)
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Si queremos que se añadan marcas de tiempo
  }
);

// Exportamos el modelo de usuario
module.exports = User;
