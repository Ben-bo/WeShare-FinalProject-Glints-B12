"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class OpenDonationDetails extends Model {
    static associate(models) {
      //associate to OpenDonation
      OpenDonationDetails.belongsTo(models.OpenDonation, {
        foreignKey: "openDonationId",
      });
      //associate to DonationType
      OpenDonationDetails.belongsTo(models.DonationType, {
        foreignKey: "donationTypeId",
      });
    }
  }
  OpenDonationDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      openDonationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      donationTypeId: {
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
      modelName: "OpenDonationDetails",
      tableName: "openDonationDetails",
    }
  );

  return OpenDonationDetails;
};
