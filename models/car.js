'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    static associate(models) {
      car.belongsTo(models.User, {
        foreignKey: "changeById",
        allowNull: false,
      });
    }
  }
  car.init({
    plate: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING,
    rentPerDay: DataTypes.INTEGER,
    carSize: {
      type: DataTypes.ENUM(["small","medium", "large"]),
      defaultValue: "small"
    },
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    availableAt: DataTypes.DATE,
    transmission: {
      type:DataTypes.ENUM(["Automatic", "Manual", "Automanual"])
    },
    year: DataTypes.INTEGER,
    typeCars: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};