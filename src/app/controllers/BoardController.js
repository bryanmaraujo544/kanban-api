const BoardsRepository = require('../repositories/BoardsRepository');

class BoardController {
  async index(req, res) {
    const boards = await BoardsRepository.findAll();

    res.json({ boards });
  }

  async show(req, res) {
    const { userId } = req.params;
    console.log({ userId });
    const board = await BoardsRepository.findByUserId(userId);
    console.log({ board });
    res.json({ board });
  }
}

module.exports = new BoardController();
