"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Donature CLASS
  class Donature extends Model {
    static associate(models) {
      //associate to DonationType
      Donature.belongsTo(models.DonationType, {
        foreignKey: "donationTypeId",
      });
      //associate to User
      Donature.belongsTo(models.User, {
        foreignKey: "userId",
      });
      //associate to Patient
      Donature.belongsTo(models.Patient, {
        foreignKey: "patientId",
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
      fullName: {
        type: DataTypes.STRING,
      },
      //required
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
      },
      //required
      donationTypeId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      //required
      patientId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      //required
      userId: {
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
