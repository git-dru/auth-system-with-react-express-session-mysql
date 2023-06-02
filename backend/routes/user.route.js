const express = require('express');

const controller = require('../controller/user.controller');

const router = express.Router();

router.route('/register').post(controller.register);

module.exports = router


