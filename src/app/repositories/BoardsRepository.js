const prisma = require('../../prisma');

class BoardsRepository {
  async findAll() {
    const boards = await prisma.board.findMany();
    return boards;
  }
}

module.exports = new BoardsRepository();
