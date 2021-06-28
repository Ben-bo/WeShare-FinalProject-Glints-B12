"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Patient CLASS
  class Patient extends Model {
    static associate(models) {
      //associate to Category
      Patient.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      //associate to User
      Patient.belongsTo(models.User, {
        foreignKey: "userId",
      });
      //associate to DonationType
      Patient.belongsTo(models.DonationType, {
        foreignKey: "donationTypeId",
      });
      //associate to Donature
      Patient.hasMany(models.Donature, {
        foreignKey: "patientId",
      });
    }
  }
  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //required
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //required
      Image: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      //required
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      //required
      donationTypeId: {
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
      modelName: "Patient",
      tableName: "patients",
    }
  );

  return Patient;
};
