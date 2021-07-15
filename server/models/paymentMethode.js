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
      donatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      paymentReceipt: {
        type: DataTypes.STRING,
        allowNull: false,
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
