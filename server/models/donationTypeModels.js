"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //DonationType CLASS
  class DonationType extends Model {
    static associate(models) {
      DonationType.belongsToMany(models.OpenDonation, {
        through: models.OpenDonationDetails,
        foreignKey: "donationTypeId",
      });
      //associate to Information
      DonationType.hasOne(models.Information, {
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
      typeName: {
        type: DataTypes.STRING,
      },
      icon: {
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
      modelName: "DonationType",
      tableName: "donationTypes",
    }
  );

  return DonationType;
};
