const ColumnsRepository = require('../repositories/ColumnsRepository');

class ColumnController {
  async index(req, res) {
    const columns = await ColumnsRepository.findAll();
    res.json({ columns });
  }

  async show(req, res) {
    const { boardId } = req.params;
    console.log({ boardId });
    const columns = await ColumnsRepository.findByBoardId(boardId);
    res.json({ columns });
  }
}

module.exports = new ColumnController();
