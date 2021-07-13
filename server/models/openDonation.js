"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //OpenDonation CLASS
  class OpenDonation extends Model {
    static associate(models) {
      //associate to Category
      OpenDonation.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      //associate to User
      OpenDonation.belongsTo(models.User, {
        foreignKey: "userId",
      });
      //associate to OpenDonationDetails
      OpenDonation.hasMany(models.OpenDonationDetails, {
        foreignKey: "openDonationId",
      });
      //associate to Donature
      OpenDonation.hasMany(models.Donature, {
        foreignKey: "openDonationId",
      });
    }
  }
  OpenDonation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //required
      donationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //required
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //required
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cloudinaryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      donationNeeded: {
        type: DataTypes.INTEGER,
      },
      isUrgent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiredDate: {
        type: DataTypes.DATEONLY,
      },
      //required
      categoryId: {
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
      modelName: "OpenDonation",
      tableName: "openDonations",
    }
  );

  return OpenDonation;
};
