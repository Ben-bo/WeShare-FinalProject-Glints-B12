'use strict';

const tableName = "openDonationDetails";
const fkName = "open_donation_details_id_open_donation_fk";
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint(tableName, {
    fields: ['openDonationId'],

    type: 'foreign key',
    name: fkName,
    references: {
    table: "openDonations",
    field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
    }),
    
    down: (queryInterface, Sequelize) => queryInterface.removeConstraint(tableName, fkName)
};
