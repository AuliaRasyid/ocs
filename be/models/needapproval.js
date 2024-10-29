'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NeedApproval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NeedApproval.init({
    Modul_id: DataTypes.INTEGER,
    Transaction_id: DataTypes.INTEGER,
    Nik: DataTypes.STRING,
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Position: DataTypes.STRING,
    Level: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'NeedApproval',
  });
  return NeedApproval;
};