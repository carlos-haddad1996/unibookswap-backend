import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      author: 'John Doe',
      price: 14.99,
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      category: 'Technology',
      image: 'image 1',
    },
  });

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      author: 'Jane Doe',
      price: 9.99,
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      category: 'Technology',
      image: 'image 2',
    },
  });

  console.log({ book1, book2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
