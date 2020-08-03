const express = require("express");

const auhtController = require('../Controllers/auth');


const router = express.Router();

router.post('/register', auhtController.register);

router.post('/login', auhtController.login);

module.exports = router;
