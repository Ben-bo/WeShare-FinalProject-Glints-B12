"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      //required & unique
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      //required
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      cardIdentityId: {
        type: Sequelize.BIGINT,
      },
      bornDate: {
        type: Sequelize.DATEONLY,
      },
      bornPlace: {
        type: Sequelize.STRING,
      },
      expiredDate: {
        type: Sequelize.DATEONLY,
      },
      eKtpConfirmation: {
        type: Sequelize.BOOLEAN,
      },
      //auto
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      //auto
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
