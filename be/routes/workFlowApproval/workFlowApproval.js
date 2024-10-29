const express = require('express');
const { createWFA, getAllWFA } = require('../../controller/workflow/WokkFlowController');
const { createNeedApproval } = require('../../controller/needapproval/needapproval');

const router = express.Router();

const initWorkFlow = (app)=> {
  router.post('/', createWFA)
  router.get('/', getAllWFA)
  router.post('/need-approval', createNeedApproval)

  return app.use ('/workflow', router)
}

module.exports={
    initWorkFlow
} 