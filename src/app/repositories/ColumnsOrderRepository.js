const prisma = require('../../prisma');

class ColumnsOrderRepository {
  async findAll() {
    const allColumnsOrder = await prisma.columnOrder.findMany();
    return allColumnsOrder;
  }

  async create({ boardId, columnId, index }) {
    const columnOrder = await prisma.columnOrder.create({
      data: {
        board_id: boardId,
        column_id: columnId,
        index,
      },
    });

    return columnOrder;
  }

  async findByBoardId(boardId) {
    const columnOrder = await prisma.columnOrder.findMany({
      where: {
        board_id: Number(boardId),
      },
      orderBy: {
        index: 'asc',
      },
    });
    return columnOrder;
  }
}

module.exports = new ColumnsOrderRepository();
