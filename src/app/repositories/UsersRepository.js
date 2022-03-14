const prisma = require('../../prisma');

class UsersRepository {
  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }
}

module.exports = new UsersRepository();
