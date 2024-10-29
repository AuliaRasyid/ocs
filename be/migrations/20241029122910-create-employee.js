'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      Approver1_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Approver1_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Approver1_position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Approver2_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Approver2_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Approver2_position: {
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
    await queryInterface.dropTable('Employees');
  }
};