const BoardsRepository = require('../repositories/BoardsRepository');

class BoardController {
  async index(req, res) {
    const boards = await BoardsRepository.findAll();

    res.json({ boards });
  }
}

module.exports = new BoardController();
