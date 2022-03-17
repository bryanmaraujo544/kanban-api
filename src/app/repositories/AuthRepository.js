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

    await prisma.board.create({
      data: {
        admin_id: user.id,
      },
    });

    const board = await prisma.findFirst({
      where: {
        admin_id: user.id,
      },
    });

    await prisma.column.create({
      data: {
        title: 'To do',
        board_id: board.id,
      },
    });

    return user;
  }
}

module.exports = new AuthRepository();
