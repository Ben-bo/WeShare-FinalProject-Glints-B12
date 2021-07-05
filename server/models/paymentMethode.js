"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class PaymentMethod extends Model {
    static associate(models) {
      //associate to Donature
      PaymentMethod.belongsTo(models.Donature, {
        foreignKey: "donatureId",
      });
    }
  }
  PaymentMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      donatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      //auto
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      //auto
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "paymentMethods",
    }
  );

  return PaymentMethod;
};
