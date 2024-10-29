'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NeedApprovals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Modul_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Transaction_id: {
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
      Email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Level: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('NeedApprovals');
  }
};