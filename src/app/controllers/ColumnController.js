const ColumnsRepository = require('../repositories/ColumnsRepository');

class ColumnController {
  async index(req, res) {
    const columns = await ColumnsRepository.findAll();
    res.json({ columns });
  }
}

module.exports = new ColumnController();
