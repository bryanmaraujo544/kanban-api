const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController.js');
const UserController = require('./app/controllers/UserController.js');

const router = Router();

router.get('/', (req, res) => {
  res.send('index page');
});

router.get('/users', UserController.index);

router.post('/auth/register', AuthController.register);

module.exports = router;
