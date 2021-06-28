"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //DonationType CLASS
  class DonationType extends Model {
    static associate(models) {
      //associate to Category
      DonationType.belongsTo(models.Category, {
        foreignKey: "categoryId"});
      //associate to OpenDonation
      DonationType.hasMany(models.OpenDonation, {
        foreignKey: "donationTypeId",
      });
      //associate to Donature
      DonationType.hasMany(models.Donature, {
        foreignKey: "donationTypeId",
     });
    }
  }
  DonationType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      donationType: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      //required
      categoryId: {
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
      modelName: "DonationType",
      tableName: "donationTypes",
    }
  );

  return DonationType;
};
