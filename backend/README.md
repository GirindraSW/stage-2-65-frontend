# Cart Management Backend

## 1) Install backend deps

```bash
cd backend
npm install
```

## 2) Database (PostgreSQL / pgAdmin)

Buat database baru di pgAdmin dengan nama:

- `cart_management`

Lalu set connection string di `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cart_management?schema=public"
PORT=5000
```

## 3) Prisma flow

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Jika `prisma:migrate` gagal karena koneksi lokal, import file SQL berikut lewat pgAdmin Query Tool:

- `backend/prisma/cart_management.sql`

## 4) Run API

```bash
npm run dev
```

Base URL:

- `http://localhost:5000/api`
