"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //Category CLASS
  class Category extends Model {
    static associate(models) {
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
      icon: {
        type: DataTypes.STRING,
      },
      isActive: {
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
      modelName: "Category",
      tableName: "categories",
    }
  );

  return Category;
};
