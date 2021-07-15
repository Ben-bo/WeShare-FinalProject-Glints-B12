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
      image: {
        type: Sequelize.STRING,
      },
      NIK: {
        type: Sequelize.BIGINT,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      bornPlace: {
        type: Sequelize.STRING,
      },
      nikExpired: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      isEktp: {
        type: Sequelize.BOOLEAN,
      },
      ktpPicture: {
        type: Sequelize.STRING,
      },
      cloudinaryId: {
        type: Sequelize.STRING,
      },
      cloudinaryKtpId: {
        type: Sequelize.STRING,
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
