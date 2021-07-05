"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //User CLASS
  class User extends Model {
    static associate(models) {
      //associate to Donature
      User.hasMany(models.Donature, {
        foreignKey: "userId",
      });
      //associate to OpenDonation
      User.hasMany(models.OpenDonation, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
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
      //required & unique
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      //required
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      NIK: {
        type: DataTypes.BIGINT,
      },
      bithDate: {
        type: DataTypes.DATEONLY,
      },
      bornPlace: {
        type: DataTypes.STRING,
      },
      nikExpired: {
        type: DataTypes.DATEONLY,
      },
      isEktp: {
        type: DataTypes.BOOLEAN,
      },
      ktpPicture: {
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
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
