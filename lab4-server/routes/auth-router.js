const express = require("express");
const bodyParser = require('body-parser');
const authRouter = express.Router();
authRouter.use(bodyParser.json());

const AuthController = require('../src/controllers/auth-controller.js')

authRouter.post('/signIn', AuthController.matchUser);
authRouter.post('/signUp', AuthController.registration);

module.exports = authRouter;