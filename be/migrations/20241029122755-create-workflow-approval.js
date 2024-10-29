'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkflowApprovals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Modul: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Nik: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkflowApprovals');
  }
};