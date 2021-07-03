var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/register', UserController.create); 
router.post('/register', UserController.save);

router.get('/authenticate', UserController.login);
router.post('/authenticate', UserController.authenticate);

router.get('/logout', UserController.logout);

module.exports = router;
