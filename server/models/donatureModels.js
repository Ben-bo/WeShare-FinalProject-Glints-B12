"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Donature CLASS
  class Donature extends Model {
    static associate(models) {
      //associate to Information
      Donature.hasMany(models.Information, {
        foreignKey: "donatureId",
      });
      //associate to PaymentMethod
      Donature.hasOne(models.Payment, {
        foreignKey: "donatureId",
      });
      //associate to User
      Donature.belongsTo(models.User, {
        foreignKey: "userId",
      });
      //associate to OpenDonation
      Donature.belongsTo(models.OpenDonation, {
        foreignKey: "openDonationId",
      });
    }
  }
  Donature.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //required
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      openDonationId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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
      modelName: "Donature",
      tableName: "donatures",
    }
  );

  return Donature;
};
