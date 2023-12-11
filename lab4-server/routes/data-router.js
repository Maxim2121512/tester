const express = require("express");
const bodyParser = require('body-parser');
const dataRouter = express.Router();
dataRouter.use(bodyParser.json());

const { initSocket, dataController } = require('../src/controllers/data-controller.js')

dataRouter.get('/get/user/:id', dataController.getUser);

module.exports = dataRouter;

