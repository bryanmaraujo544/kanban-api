const prisma = require('../../prisma');

class BoardsRepository {
  async findAll() {
    const boards = await prisma.board.findMany();
    return boards;
  }

  async findByUserId(userId) {
    const board = await prisma.board.findFirst({
      where: {
        admin_id: Number(userId),
      },
    });
    return board;
  }
}

module.exports = new BoardsRepository();
