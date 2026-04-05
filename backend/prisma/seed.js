import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productSeed = [
  {
    name: "Wireless Headphone X7",
    price: 899000,
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Mechanical Keyboard K2",
    price: 1099000,
    stock: 11,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Portable SSD 1TB",
    price: 1499000,
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1591799265444-d66432b91588?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Smart Watch Nova",
    price: 1250000,
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
];

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: productSeed });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
