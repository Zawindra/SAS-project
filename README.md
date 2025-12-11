📚 BookStore — Fullstack Book Management App

BookStore adalah aplikasi berbasis MERN-style (React + Express + MySQL) untuk menampilkan daftar buku, melihat detail, menambahkan ke keranjang, serta fitur admin untuk upload, edit, dan hapus buku.

Aplikasi ini mendukung guest user, user login, dan admin panel.

🚀 Features
👤 Guest User

Bisa melihat semua buku

Tidak bisa membeli (harus login)

Tombol Login / Register muncul di navbar

👤 User (Logged In)

Bisa membeli buku (Add to Cart)

Keranjang muncul di navbar dengan badge jumlah item

Bisa menambah & mengurangi jumlah pembelian di cart

🛒 Cart System

Disimpan di localStorage

Badge jumlah item real-time

Tambah + Kurang quantity

👨‍💼 Admin Role

CRUD Buku:

Upload buku

Edit buku

Delete buku

Tidak memiliki cart

🛠️ Tech Stack
Frontend

React + Vite

React Router

SweetAlert2

Inline CSS Styling

Backend

Node.js + Express

MySQL

JWT Authentication

Multer (upload cover book)

Database

MySQL (books table + users table)

📁 Folder Structure (Simplified)
project/
│── backend/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── uploads/        # (ignored by Git)
│   ├── app.js
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── ...

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/username/bookstore.git
cd bookstore

🖥️ Backend Setup

Masuk folder backend:

cd backend
npm install


Buat file .env:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bookstore
JWT_SECRET=your_secret_key


Jalankan backend:

npm start

💻 Frontend Setup

Masuk folder frontend:

cd frontend
npm install
npm run dev

➕ Admin Account

Buat admin (manual atau seed):

email: admin@example.com
password: admin123

📝 Notes

Folder uploads/ dan .env tidak masuk git (ignored)

Pastikan backend sudah running sebelum membuka frontend

📌 License

MIT — Free to use and modify.