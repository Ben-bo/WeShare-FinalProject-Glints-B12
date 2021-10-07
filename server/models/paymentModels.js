"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Donature, {
        foreignKey: "donatureId",
      });
    }
  }
  Payment.init(
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
      description: {
        type: DataTypes.STRING,
      },
      paymentReceipt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cloudinary_id: {
        type: DataTypes.STRING,
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
      modelName: "Payment",
      tableName: "payments",
    }
  );
  return Payment;
};
