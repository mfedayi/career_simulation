const bcrypt = require("bcryptjs");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  bcrypt,
  prisma,
};
