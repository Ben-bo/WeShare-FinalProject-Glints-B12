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
      bithDate: {
        type: Sequelize.DATEONLY,
      },
      bornPlace: {
        type: Sequelize.STRING,
      },
      nikExpired: {
        type: Sequelize.DATEONLY,
      },
      isEktp: {
        type: Sequelize.BOOLEAN,
      },
      ktpPicture: {
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
