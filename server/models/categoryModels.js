"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class Category extends Model {
    static associate(models) {
      //associate to DonationType
      Category.hasMany(models.DonationType, {
        foreignKey: "categoryId"});
      //associate to OpenDonation
      Category.hasMany(models.OpenDonation, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING,
      },
      image: {
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
      modelName: "Category",
      tableName: "categories",
    }
  );

  return Category;
};
