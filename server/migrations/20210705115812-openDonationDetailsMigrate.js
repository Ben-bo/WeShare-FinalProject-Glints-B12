"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("openDonationDetails", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      openDonationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      donationTypeId: {
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
    await queryInterface.dropTable("openDonationDetails");
  },
};
