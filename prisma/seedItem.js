const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const run = async () => {
  try {
    const item = await prisma.item.create({
      data: {
        name: "Iphone 15",
        description: "strong phone that takes good beating.",
      },
    });
    console.log("item created:", item);
  } catch (error) {
    console.error("Error inserting Item: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

run();
