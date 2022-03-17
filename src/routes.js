const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController.js');
const BoardController = require('./app/controllers/BoardController.js');
const ColumnController = require('./app/controllers/ColumnController.js');
const UserController = require('./app/controllers/UserController.js');

const router = Router();

router.get('/', (req, res) => {
  res.send('index page');
});

router.get('/users', UserController.index);
router.get('/users/:email', UserController.listByEmail);

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/boards', BoardController.index);

router.get('/columns', ColumnController.index);

module.exports = router;
