const res = require('express/lib/response');
const TasksRepository = require('../repositories/TasksRepository');

class TaskController {
  async index(req, res) {
    const tasks = await TasksRepository.findAll();
    res.json({ tasks });
  }

  async show(req, res) {
    const { boardId } = req.params;
    const tasks = await TasksRepository.findByBoardId(boardId);

    res.json({ tasks });
  }

  async store(req, res) {
    const { title, tag, columnId, boardId, index } = req.body;
    console.log({ title, tag, columnId, boardId, index });

    const hasIndex = index !== null && index !== undefined;
    if (!title || !tag || !columnId || !boardId || !hasIndex) {
      return res
        .status(400)
        .json({ message: 'Some task properties are missing' });
    }

    const hasTaskWithThisTitleInBoard = await TasksRepository.findByTitle({
      title,
      boardId,
    });

    if (hasTaskWithThisTitleInBoard) {
      return res
        .status(400)
        .json({ message: 'Already has a task with this title in board' });
    }

    const task = await TasksRepository.create({
      title,
      tag,
      columnId,
      boardId,
      index,
    });

    res.json({ message: 'Task created', task });
  }

  async update(req, res) {
    const { taskId } = req.params;
    const fieldsToBeUpdated = req.body;
    console.log(fieldsToBeUpdated);

    await TasksRepository.update({ taskId, fieldsToBeUpdated });
  }
}

module.exports = new TaskController();
