"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //User CLASS
  class User extends Model {
    static associate(models) {
      // one User just can give only One review
      //this.hasMany(models.Review, { foreignKey: "userId", onDelete: "cascade" });
      //getting role for user from Role CLASS
      //this.belongsTo(models.Role, { foreignKey: "roleId" });
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
      profilePicture: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //required
      cardIdentityId: {
        type: DataTypes.BIGINT,
      },
      bornDate: {
        type: DataTypes.DATEONLY,
        // get: function () {
        //   return moment.utc(this.getDataValue("bornDate")).format("YYYY-MM-DD");
        // },
      },
      bornPlace: {
        type: DataTypes.STRING,
      },
      expiredDate: {
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
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
