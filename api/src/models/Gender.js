const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "gender",
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
