"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("openDonations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //required
      donationName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //required
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      donationNeeded: {
        type: Sequelize.STRING,
      },
      expiredDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("openDonations");
  },
};
