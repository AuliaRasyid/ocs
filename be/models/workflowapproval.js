'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkflowApproval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkflowApproval.init({
    Modul: DataTypes.STRING,
    Type: DataTypes.STRING,
    Value: DataTypes.INTEGER,
    Nik: DataTypes.STRING,
    Name: DataTypes.STRING,
    Position: DataTypes.STRING,
    Email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WorkflowApproval',
  });
  return WorkflowApproval;
};