const express = require('express');
const { getEmployee, getEmployeeByNik } = require('../../controller/employee/Employes');

const router = express.Router();

const initEmployess = (app)=> {
  router.get('/', getEmployee)
  router.get('/:nik', getEmployeeByNik)
  return app.use ('/employess', router)
}

module.exports={
    initEmployess
} 