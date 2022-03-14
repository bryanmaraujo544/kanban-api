const UsersRepository = require('../repositories/UsersRepository');
class UserController {
  async index(req, res) {
    const users = await UsersRepository.findAll();
    res.send(users);
  }
}

module.exports = new UserController();
