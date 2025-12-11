📚 BookStore — Fullstack Book Management App

BookStore adalah aplikasi React + Express + MySQL dengan fitur role lengkap (Guest, User, Admin) dan cart system.

🚀 Features
👤 Guest

Melihat semua buku

Tidak bisa membeli (harus login)

Navbar menampilkan Login / Register

👤 User

Bisa beli buku (Add to Cart)

Keranjang tampil + jumlah item

Qty bisa tambah/kurang

👨‍💼 Admin

CRUD Buku

Upload cover / update / delete

Tidak memiliki cart

🛠 Tech Stack

Frontend: React, Vite, Router, SweetAlert2
Backend: Express, MySQL, JWT, Multer

📌 Copy Sections

Kamu cukup klik area kode, lalu VSCode / GitHub akan otomatis menampilkan tombol copy.

📥 Clone Repo
git clone https://github.com/username/bookstore.git
cd bookstore

⚙ Instal Backend
cd backend
npm install

🧩 Create .env File
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bookstore
JWT_SECRET=your_secret_key

▶ Run Backend
npm start

💻 Setup Frontend
cd frontend
npm install
npm run dev

🔑 Default Admin
email: admin@example.com
password: admin123

📁 Folder Structure
project/
│── backend/
│── frontend/
└── README.md

📌 Notes

uploads/ & .env sudah ada di .gitignore

Pastikan MySQL berjalan sebelum start backend
