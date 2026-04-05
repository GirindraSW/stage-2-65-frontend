import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

// Delay kecil untuk simulasi API call agar loading state di frontend terlihat.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/api/products", async (_request, response) => {
  await wait(350);
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  response.json(products);
});

app.get("/api/cart", async (_request, response) => {
  await wait(350);

  const cartItems = await prisma.cartItem.findMany({
    include: { product: true },
    orderBy: { id: "desc" },
  });

  response.json(cartItems);
});

app.post("/api/cart", async (request, response) => {
  await wait(450);
  const { productId } = request.body;

  if (!productId) {
    return response.status(400).json({ message: "productId wajib diisi." });
  }

  const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

  if (!product) {
    return response.status(404).json({ message: "Produk tidak ditemukan." });
  }

  const existingCartItem = await prisma.cartItem.findUnique({
    where: { productId: Number(productId) },
  });

  const cartItem = existingCartItem
    ? await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
        include: { product: true },
      })
    : await prisma.cartItem.create({
        data: { productId: Number(productId), quantity: 1 },
        include: { product: true },
      });

  return response.json(cartItem);
});

app.patch("/api/cart/:id", async (request, response) => {
  await wait(500);

  const cartId = Number(request.params.id);
  const quantity = Number(request.body.quantity);

  if (!Number.isFinite(quantity) || quantity < 1) {
    return response.status(400).json({ message: "Quantity minimal 1." });
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartId },
    data: { quantity },
    include: { product: true },
  });

  return response.json(updatedCartItem);
});

app.delete("/api/cart/:id", async (request, response) => {
  await wait(400);

  const cartId = Number(request.params.id);
  await prisma.cartItem.delete({ where: { id: cartId } });

  return response.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Cart API berjalan di http://localhost:${PORT}`);
});
