// Aquí colocamos la información que usa Sequelize
const sequelize = require("../config/mysql"); // La instancia del objeto de Sequelize
const { DataTypes } = require("sequelize"); // Los tipos de datos de Sequelize

// Aquí definimos el modelo de Usuario
const User = sequelize.define(
  "users", // Este es el nombre de la tabla
  {
    id: {
      // Aquí estarán los listados de atributos de la tabla
      type: DataTypes.UUID,             // Este es el tipo de dato (UUID)
      defaultValue: DataTypes.UUIDV4,   // Valor por defecto para la inicialización
      primaryKey: true                  // Que sea la llave primaria
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false
    }
  },
  {
    timestamps: true, // Si queremos que se añadan marcas de tiempo
  }
);

// Exportamos el modelo de usuario
module.exports = User;
