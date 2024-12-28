const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Deleting data from Comment table first because it has foreign key dependencies
    await prisma.comment.deleteMany();

    // Then deleting data from Post table
    await prisma.post.deleteMany();

    // Finally, deleting data from User table
    await prisma.user.deleteMany();

    console.log(
      "All data has been deleted from the tables, but tables are intact."
    );
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData();
