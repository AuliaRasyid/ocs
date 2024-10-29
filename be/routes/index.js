const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { initEmployess } = require('./employes/Employes')
const { initWorkFlow } = require('./workFlowApproval/workFlowApproval')

const createServer = () => {
    const app = express()

    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res)=>{
        return res.json('hello world')
    })

    initEmployess(app)
    initWorkFlow(app)

    return app
}

module.exports = {
    createServer
}