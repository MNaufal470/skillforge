const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.mst_languages.createMany({
      data: [
        {
          name: "English",
        },
        {
          name: "Spanish",
        },
        {
          name: "French",
        },

        {
          name: "German",
        },
        {
          name: "Italian",
        },

        {
          name: "Portuguese",
        },
        {
          name: "Russian",
        },
        {
          name: "Hindi",
        },
        {
          name: "Dutch",
        },
        {
          name: "Greek",
        },
        {
          name: "Indonesia",
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
