const express = require('express')

const routes = express.Router();
const {veryfyToken} = require('../middleware/Auth')

routes.use('/auth',require('./authRoutes'))
routes.use('/banner',require('./bannerRoute'))

module.exports = routes;