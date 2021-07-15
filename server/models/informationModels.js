"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class Information extends Model {
    static associate(models) {
      //associate to DonationType
      Information.belongsTo(models.DonationType, {
        foreignKey: "donationTypeId",
      });
      //associate to Donature
      Information.belongsTo(models.Donature, {
        foreignKey: "donatureId",
      });
    }
  }
  Information.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      unAmount: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.STRING,
      },
      isAnonymous: {
        type: DataTypes.BOOLEAN,
      },
      donationTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      donatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      isSelect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Information",
      tableName: "informations",
    }
  );

  return Information;
};
