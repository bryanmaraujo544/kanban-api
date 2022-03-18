const prisma = require('../../prisma');

class ColumnsRepository {
  async findAll() {
    const columns = await prisma.column.findMany();
    return columns;
  }

  async findByBoardId(boardId) {
    const columns = await prisma.column.findMany({
      where: {
        board_id: Number(boardId),
      },
    });

    return columns;
  }
}

module.exports = new ColumnsRepository();
