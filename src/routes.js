const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController.js');
const BoardController = require('./app/controllers/BoardController.js');
const CollaboratorController = require('./app/controllers/CollaboratorController.js');
const ColumnController = require('./app/controllers/ColumnController.js');
const ColumnsOrderController = require('./app/controllers/ColumnsOrderController.js');
const TaskController = require('./app/controllers/TaskController.js');
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
router.get('/boards/:userId', BoardController.show);

router.get('/columns', ColumnController.index);
router.get('/columns/:boardId', ColumnController.show);
router.post('/columns', ColumnController.store);
router.delete('/columns/:columnId', ColumnController.delete);
router.put('/columns/:columnId', ColumnController.update);

router.get('/tasks', TaskController.index);
router.get('/tasks/:boardId', TaskController.show);
router.post('/tasks', TaskController.store);
router.put('/tasks/:taskId', TaskController.update);
router.delete('/tasks/:taskId', TaskController.delete);

router.get('/columns-order', ColumnsOrderController.index);
router.get('/columns-order/:boardId', ColumnsOrderController.showByBoardId);
router.post('/columns-order', ColumnsOrderController.store);
router.put('/columns-order', ColumnsOrderController.update);

router.get('/collaborators', CollaboratorController.index);
router.get('/collaborators/:boardId', CollaboratorController.show);
router.post('/collaborators', CollaboratorController.store);
router.get('/collaborators/board/:userId', CollaboratorController.showByUserId);

module.exports = router;
