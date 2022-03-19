const ColumnsOrderRepository = require('../repositories/ColumnsOrderRepository');

class ColumnsOrderController {
  async index(req, res) {
    const allColumnsOrder = await ColumnsOrderRepository.findAll();
    res.send(allColumnsOrder);
  }

  async showByBoardId(req, res) {
    const { boardId } = req.params;
    const columnsOrder = await ColumnsOrderRepository.findByBoardId(boardId);
    res.send(columnsOrder);
  }

  async store(req, res) {
    const { boardId, columnId, index } = req.body;
    if (!boardId || !columnId || !index) {
      return res
        .status(400)
        .json({ message: 'Fields are missing', columnOrder: null });
    }

    const columnOrder = await ColumnsOrderRepository.create({
      boardId,
      columnId,
      index,
    });
    res.json({ message: 'Saved the new column order', columnOrder });
  }
}

module.exports = new ColumnsOrderController();
