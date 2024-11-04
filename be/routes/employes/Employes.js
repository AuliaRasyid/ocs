const express = require('express');
const { getEmployees, getEmployeeNik } = require('../../controller/employee/Employes');

const router = express.Router();

const initEmployess = (app)=> {
  router.get('/', getEmployees)
  router.get('/:nik', getEmployeeNik)
  return app.use ('/employess', router)
}

module.exports={
    initEmployess
} 