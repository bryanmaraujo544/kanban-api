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
      include: {
        ColumnOrder: true,
      },
    });

    return columns;
  }

  async create({ title, boardId }) {
    const column = await prisma.column.create({
      data: {
        title,
        board_id: boardId,
      },
    });

    return column;
  }

  async delete(columnId) {
    await prisma.columnOrder.deleteMany({
      where: {
        column_id: Number(columnId),
      },
    });

    await prisma.task.deleteMany({
      where: {
        column_id: Number(columnId),
      },
    });

    await prisma.column.delete({
      where: {
        id: Number(columnId),
      },
    });
  }

  async update({ columnId, fieldsToBeUpdated }) {
    await prisma.column.update({
      where: {
        id: Number(columnId),
      },
      data: {
        ...fieldsToBeUpdated,
      },
    });
  }

  async findByTitle({ title, boardId }) {
    const column = await prisma.column.findFirst({
      where: {
        board_id: boardId,
        AND: [
          {
            title,
          },
        ],
      },
    });

    return column;
  }
}

module.exports = new ColumnsRepository();
