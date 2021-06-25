"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patients", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //required
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //required
      Image: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      //required
      categoryId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      //required
      donationTypeId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      //required
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
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
    await queryInterface.dropTable("patients");
  },
};
