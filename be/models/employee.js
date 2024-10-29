'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    Name: DataTypes.STRING,
    Nik: DataTypes.STRING,
    Name: DataTypes.STRING,
    Position: DataTypes.STRING,
    Email: DataTypes.STRING,
    Approver1_name: DataTypes.STRING,
    Approver1_email: DataTypes.STRING,
    Approver1_position: DataTypes.STRING,
    Approver2_name: DataTypes.STRING,
    Approver2_email: DataTypes.STRING,
    Approver2_position: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};