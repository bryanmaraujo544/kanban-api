const UsersRepository = require('../repositories/UsersRepository');
class UserController {
  async index(req, res) {
    const users = await UsersRepository.findAll();
    res.json({ users });
  }

  async listByEmail(req, res) {
    const { email } = req.params;
    const users = await UsersRepository.findByEmail(email);

    if (!users) {
      res.json({ message: 'There are no users with this email', users: null });
      return;
    }

    res.json({ message: 'Users with this email', users });
  }
}

module.exports = new UserController();
