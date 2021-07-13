"use strict";
const { Model } = require("sequelize");
const { DonationType } = require('../models/donationTypeModels');

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class OpenDonationDetails extends Model {
    static associate(models) {
      //associate to OpenDonation
      OpenDonationDetails.belongsTo(models.OpenDonation, {
        foreignKey: "openDonationId", targetKey: "id"
      });
      //associate to DonationType
      OpenDonationDetails.hasOne(models.DonationType, {
        foreignKey: "id", sourceKey: "donationTypeId"
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
      scopes: {
        includeType: {
          include: [{ 
            model: DonationType, 
            attributes: ['typeName'],
            required: false
          }]
        }
      }
    }
  );

  return OpenDonationDetails;
};
