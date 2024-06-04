const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          title: "Business Analytics and Intelligence",
          description:
            "Delve into business analytics, focusing on data-driven decision-making, predictive modeling, and performance optimization. Acquire skills to turn data into actionable insights for business growth.",
          imageUrl: "/category/office.png",
          iconUrl: "/category/investment.png",
        },
        {
          title: "Web Development",
          description:
            "Master the fundamentals of web development, including HTML, CSS, and JavaScript. Explore responsive design principles and learn how to create interactive and visually appealing websites.",
          imageUrl: "/category/developer.png",
          iconUrl: "/category/javascript.png",
        },
        {
          title: "Digital Marketing Strategies",
          description:
            "Dive into the world of digital marketing with courses on SEO, social media marketing, content creation, and online advertising. Develop skills to create effective digital campaigns and enhance brand visibility.",
          imageUrl: "/category/influencer.png",
          iconUrl: "/category/social-media.png",
        },

        {
          title: "Graphic Design Mastery",
          description:
            "Explore the principles of graphic design, including layout, color theory, and typography. Develop proficiency in design tools and unleash your creativity in crafting visually stunning graphics.",
          imageUrl: "/category/graphic-designer.png",
          iconUrl: "/category/graphic-designer-logo.png",
        },
        {
          title: "Language Learning",
          description:
            "Embark on a language learning journey with beginner courses in languages such as Spanish, French, or Mandarin. Acquire basic vocabulary, grammar, and conversational skills.",
          imageUrl: "/category/language.png",
          iconUrl: "/category/languages.png",
        },

        {
          title: "Artificial Intelligence (AI) Fundamentals",
          description:
            "Explore the world of artificial intelligence with courses covering machine learning, neural networks, and AI applications. Understand the ethical considerations surrounding AI and gain insights into how AI is shaping various industries",
          imageUrl: "/category/regulation.png",
          iconUrl: "/category/artificial-intelligence.png",
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
