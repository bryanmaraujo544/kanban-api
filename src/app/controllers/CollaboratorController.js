const CollaboratorsRepository = require('../repositories/CollaboratorsRepository');

class CollaboratorController {
  async index(req, res) {
    const allCollaborators = await CollaboratorsRepository.findAll();
    res.send(allCollaborators);
  }

  async show(req, res) {
    const { boardId } = req.params;
    const collaborators = await CollaboratorsRepository.findByBoardId(boardId);
    res.json({ collaborators });
  }

  async showByUserId(req, res) {
    const { userId } = req.params;
    const boardsOfThisUser = await CollaboratorsRepository.findByUserId(userId);
    res.send(boardsOfThisUser);
  }

  async store(req, res) {
    const { userId, boardId } = req.body;
    console.log({ userId, boardId });

    const collaboratorAdded = await CollaboratorsRepository.create({
      userId,
      boardId,
    });

    res.json({ collaboratorAdded });
  }
}

module.exports = new CollaboratorController();
