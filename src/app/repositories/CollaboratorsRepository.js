const prisma = require('../../prisma');

class CollaboratorsRepository {
  async findAll() {
    const collaborators = await prisma.collaborator.findMany();
    return collaborators;
  }

  async create({ userId, boardId }) {
    const collaborator = await prisma.collaborator.createMany({
      data: {
        user_id: Number(userId),
        board_id: Number(boardId),
      },
    });
    return collaborator;
  }

  async findByBoardId(boardId) {
    const collaborators = await prisma.collaborator.findMany({
      where: {
        board_id: Number(boardId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
          },
        },
      },
    });
    return collaborators;
  }

  async findByUserId(userId) {
    const boardsOfUser = await prisma.collaborator.findMany({
      where: {
        user_id: Number(userId),
      },
      include: {
        board: {
          include: {
            user: true,
          },
        },
      },
    });
    return boardsOfUser;
  }
}

module.exports = new CollaboratorsRepository();
