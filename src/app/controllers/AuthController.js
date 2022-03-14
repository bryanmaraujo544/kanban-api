const AuthRepository = require('../repositories/AuthRepository');
const bcrypt = require('bcrypt');

class AuthController {
  async register(req, res) {
    const { name, profileImageUrl, email, password } = req.body;
    if (!name || !profileImageUrl || !email || !password) {
      res
        .status(400)
        .json({ message: 'Any field empty is allowed.', user: null });
    }

    const isEmailBeenUsed = await AuthRepository.findByEmail(email);
    if (isEmailBeenUsed) {
      return res
        .status(400)
        .json({ message: 'Email is already been used.', user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await AuthRepository.create({
      name,
      profileImageUrl,
      email,
      hashedPassword,
    });
    res.send({ message: 'User created', user: userCreated });
  }
}

module.exports = new AuthController();
