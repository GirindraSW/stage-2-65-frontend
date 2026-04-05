CREATE TABLE IF NOT EXISTS "Product" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  stock INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CartItem" (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL DEFAULT 1,
  "productId" INTEGER NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT cartitem_product_fk FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE
);

TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;

INSERT INTO "Product" (name, price, image, stock) VALUES
('Wireless Headphone X7', 899000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', 14),
('Mechanical Keyboard K2', 1099000, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop', 11),
('Portable SSD 1TB', 1499000, 'https://images.unsplash.com/photo-1591799265444-d66432b91588?q=80&w=1000&auto=format&fit=crop', 7),
('Smart Watch Nova', 1250000, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', 9);
