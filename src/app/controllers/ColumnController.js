const ColumnsRepository = require('../repositories/ColumnsRepository');

class ColumnController {
  async index(req, res) {
    const columns = await ColumnsRepository.findAll();
    res.json({ columns });
  }

  async show(req, res) {
    const { boardId } = req.params;
    const columns = await ColumnsRepository.findByBoardId(boardId);
    columns.forEach((column) => console.log(column));
    // console.log({ columns });
    res.json({ columns });
  }

  async store(req, res) {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      return res.status.json({
        message: 'There are missing fields',
        column: null,
      });
    }

    const hasColumn = await ColumnsRepository.findByTitle({ title, boardId });
    if (hasColumn) {
      return res
        .status(400)
        .json({ message: 'The column already exists', column: null });
    }

    const column = await ColumnsRepository.create({ title, boardId });
    res.json({ message: 'Column created', column });
  }
}

module.exports = new ColumnController();
