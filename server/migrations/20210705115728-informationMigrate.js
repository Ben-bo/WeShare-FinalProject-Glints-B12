"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("informations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      unAmount: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      isAnonymous: {
        type: Sequelize.BOOLEAN,
      },
      donationTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      donatureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
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
    await queryInterface.dropTable("informations");
  },
};
