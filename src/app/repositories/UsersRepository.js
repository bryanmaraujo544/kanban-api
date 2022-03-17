const prisma = require('../../prisma');

class UsersRepository {
  async findAll() {
    const users = await prisma.user.findMany();
    const newUsers = users.map(({ id, name, photo_url, email }) => ({
      id,
      name,
      photo_url,
      email,
    }));

    return newUsers;
  }

  async findByEmail(email) {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: email,
        },
      },
    });

    const newUsers = users.map(({ id, name, photo_url, email }) => ({
      id,
      name,
      photo_url,
      email,
    }));

    return newUsers;
  }
}

module.exports = new UsersRepository();
