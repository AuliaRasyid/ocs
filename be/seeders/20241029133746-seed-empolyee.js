'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [
      {
        Nik: '1234567890123456',
        Name: 'John Doe',
        Email: 'john.doe@example.com',
        Position: 'Manager',
        Approver1_name: 'Jane Smith',
        Approver1_email: 'jane.smith@example.com',
        Approver1_position: 'Director',
        Approver2_name: 'Robert Brown',
        Approver2_email: 'robert.brown@example.com',
        Approver2_position: 'Vice President',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Nik: '1234567890123457',
        Name: 'Alice Johnson',
        Email: 'alice.johnson@example.com',
        Position: 'Supervisor',
        Approver1_name: 'Michael Green',
        Approver1_email: 'michael.green@example.com',
        Approver1_position: 'Manager',
        Approver2_name: 'Susan White',
        Approver2_email: 'susan.white@example.com',
        Approver2_position: 'Director',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
