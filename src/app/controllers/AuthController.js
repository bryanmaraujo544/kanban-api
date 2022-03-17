const AuthRepository = require('../repositories/AuthRepository');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

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

  async login(req, res) {
    const { email, password } = req.body;
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'There is no user with this email', token: null });
    }

    const hashedPass = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPass);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'The password is wrong!', token: null });
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      profileImageUrl: user.photo_url,
    });
    res.json({ message: 'User logged', token });
  }
}

module.exports = new AuthController();
