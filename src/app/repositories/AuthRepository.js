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

    const board = await prisma.board.findFirst({
      where: {
        admin_id: user.id,
      },
    });

    const column = await prisma.column.create({
      data: {
        title: 'To do',
        board_id: board.id,
      },
    });

    await prisma.columnOrder.create({
      data: {
        board_id: board.id,
        column_id: column.id,
        index: 0,
      },
    });

    return user;
  }
}

module.exports = new AuthRepository();
