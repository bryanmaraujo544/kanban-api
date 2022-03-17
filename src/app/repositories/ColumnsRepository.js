const prisma = require('../../prisma');

class ColumnsRepository {
  async findAll() {
    const columns = await prisma.column.findMany();
    return columns;
  }
}

module.exports = new ColumnsRepository();
