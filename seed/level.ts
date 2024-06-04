const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.mst_levels.createMany({
      data: [
        {
          name: "Beginner",
        },

        {
          name: "Intermediate",
        },

        {
          name: "Advanced",
        },

        {
          name: "Proficiency",
        },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
