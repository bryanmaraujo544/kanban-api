const ColumnsOrderRepository = require('../repositories/ColumnsOrderRepository');

class ColumnsOrderController {
  async index(req, res) {
    const allColumnsOrder = await ColumnsOrderRepository.findAll();
    res.send(allColumnsOrder);
  }

  async showByBoardId(req, res) {
    const { boardId } = req.params;
    const columnsOrder = await ColumnsOrderRepository.findByBoardId(boardId);
    res.json({ columnsOrder });
  }

  async store(req, res) {
    const { boardId, columnId, index } = req.body;

    if (!boardId || !columnId || index === null || index === undefined) {
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

  async update(req, res) {
    const { columnsIndexAndId } = req.body;

    if (!columnsIndexAndId) {
      return res.json({ message: 'Fields are missing' });
    }

    await ColumnsOrderRepository.updateMany(columnsIndexAndId);

    res.json({ message: 'Columns Order Updated!' });
  }
}

module.exports = new ColumnsOrderController();
