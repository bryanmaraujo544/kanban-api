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
    const { title, tag, columnId, boardId } = req.body;

    if (!title || !tag || !columnId || !boardId) {
      res.status(400).json({ message: 'Some task properties are missing' });
    }

    const hasTaskWithThisTitleInBoard = await TasksRepository.findByTitle({
      title,
      boardId,
    });

    if (hasTaskWithThisTitleInBoard) {
      res
        .status(400)
        .json({ message: 'Already has a task with this title in board' });
      return;
    }

    const task = await TasksRepository.create({
      title,
      tag,
      columnId,
      boardId,
    });

    res.json({ message: 'Task created', task });
  }
}

module.exports = new TaskController();
