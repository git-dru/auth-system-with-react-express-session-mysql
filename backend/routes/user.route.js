const express = require('express');

const controller = require('../controller/user.controller');

const router = express.Router();

router.route('/register').post(controller.register);
router.route('/login').post(controller.login)
router.route('/logout').get(controller.logout)
module.exports = router


