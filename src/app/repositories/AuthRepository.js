const prisma = require('../../prisma');

class AuthRepository {
  async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async create({ name, profileImageUrl, email, hashedPassword }) {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo_url: profileImageUrl,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}

module.exports = new AuthRepository();
