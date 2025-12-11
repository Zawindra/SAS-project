📚 BookStore — Fullstack Book Management App

BookStore adalah aplikasi React + Express + MySQL untuk mengelola data buku dengan fitur role Guest, User, dan Admin.

🚀 Features
👤 Guest User

Melihat semua buku.

Tidak bisa membeli (muncul alert harus login).

Navbar menampilkan Login / Register.

👤 User

Bisa membeli buku (Add to Cart).

Cart menyimpan jumlah item + qty.

Badge icon keranjang real-time.

👨‍💼 Admin

CRUD Buku lengkap (Upload, Edit, Delete).

Tidak memiliki cart.

🛠️ Tech Stack
Frontend

React + Vite

React Router

SweetAlert2

Inline Styling

Backend

Node.js

Express

MySQL

JWT Auth

Multer (Upload Cover Book)

📁 Folder Structure (Simplified)
project/
│── backend/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── uploads/
│   ├── app.js
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── ...

📌 Copy Sections
📥 1. Clone Repository

Klik tombol copy lalu jalankan di terminal:

git clone https://github.com/username/bookstore.git
cd bookstore

⚙️ 2. Install Backend Dependencies
cd backend
npm install

🧩 3. Create .env File
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bookstore
JWT_SECRET=your_secret_key

▶️ 4. Run Backend
npm start

💻 5. Setup Frontend
cd frontend
npm install
npm run dev

🔑 6. Default Admin Account (Optional)
email: admin@example.com
password: admin123

📝 Notes

Folder uploads/ dan file .env sudah masuk .gitignore.

Pastikan backend + MySQL berjalan sebelum akses frontend.

📌 License

MIT — free to use and modify.
