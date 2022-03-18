const prisma = require('../../prisma');

class TasksRepository {
  async findAll() {
    const tasks = await prisma.task.findMany();
    return tasks;
  }

  async findByBoardId(boardId) {
    const tasks = await prisma.task.findMany({
      where: {
        board_id: Number(boardId),
      },
    });

    return tasks;
  }

  async findByTitle({ title, boardId }) {
    const task = await prisma.task.findFirst({
      where: {
        title,
        board_id: boardId,
      },
    });

    return task;
  }

  async create({ title, tag, columnId, boardId }) {
    const task = await prisma.task.create({
      data: {
        title,
        tag,
        column_id: columnId,
        board_id: boardId,
      },
    });

    return task;
  }
}

module.exports = new TasksRepository();
