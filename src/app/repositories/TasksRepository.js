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

  async create({ title, tag, columnId, boardId, index }) {
    const task = await prisma.task.create({
      data: {
        title,
        tag,
        column_id: columnId,
        board_id: boardId,
        index,
      },
    });

    return task;
  }

  async update({ taskId, fieldsToBeUpdated }) {
    await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        ...fieldsToBeUpdated,
      },
    });
  }

  async delete(taskId) {
    await prisma.task.delete({
      where: {
        id: Number(taskId),
      },
    });
  }
}

module.exports = new TasksRepository();
