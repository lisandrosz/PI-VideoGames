const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        initialValue: 1,
        allowNull: false,
        primaryKey: true,
        unique: true,
        // Le pongo el 0 delante para diferenciar a la hora de mostrar el detalle
        get() {
          return "0" + this.getDataValue("id");
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
      },
      plataforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
