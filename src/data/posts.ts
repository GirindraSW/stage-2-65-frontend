export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  author: string;
  category: string;
  date: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    id: "react-router-basic",
    title: "Setup React Router untuk Multi-Page Blog",
    summary: "Panduan singkat setup route Home, About, dan Post Detail di React.",
    author: "Noble Student",
    category: "React",
    date: "2026-04-03",
    content:
      "Di artikel ini kita setup routing dasar dengan BrowserRouter, Routes, dan Route. Lalu kita lanjutkan dengan nested route untuk halaman posts serta dynamic route untuk detail post.",
  },
  {
    id: "tailwind-theme-custom",
    title: "Custom Tailwind Theme untuk Blog",
    summary: "Cara extend warna, spacing, dan font agar tampilan blog lebih konsisten.",
    author: "Noble Student",
    category: "Tailwind",
    date: "2026-04-03",
    content:
      "Tailwind membantu styling cepat dengan utility classes. Kamu bisa custom token warna dan radius agar identitas visual project terasa lebih rapi.",
  },
  {
    id: "shadcn-card-button",
    title: "Menggunakan ShadCN Button dan Card",
    summary: "Menggabungkan komponen ShadCN untuk UI list post yang reusable.",
    author: "Noble Student",
    category: "UI",
    date: "2026-04-03",
    content:
      "ShadCN memudahkan kamu membuat komponen siap pakai. Di checkpoint ini, Button dipakai untuk navigasi dan Card dipakai untuk daftar post.",
  },
];
