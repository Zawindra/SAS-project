import db from "../config/db.js";
import fs from "fs";
import path from "path";

export const getBooks = async () => {
  const [rows] = await db.query("SELECT * FROM books ORDER BY id DESC");
  return rows;
};

export const getBookById = async (id) => {
  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [id]);
  return rows[0] || null;
};

export const createBook = async (data) => {
  const { title, author, price, genre, description, cover_url } = data;

  const [result] = await db.query(
    `INSERT INTO books (title, author, price, genre, description, cover_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, author, price, genre, description, cover_url]
  );

  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [
    result.insertId,
  ]);
  return rows[0];
};

export const updateBook = async (id, data) => {
  const {
    title,
    author,
    price,
    genre,
    description,
    cover_url // path baru
  } = data;

  // Ambil data lama
  const [oldRows] = await db.query("SELECT cover_url FROM books WHERE id=?", [
    id,
  ]);
  if (oldRows.length === 0) return null;

  const oldCover = oldRows[0].cover_url;

  /**
   * SAFE DELETE — Tidak akan error meski file lama tidak ada!
   */
  if (cover_url && oldCover) {
    const oldPath = path.join(
      process.cwd(),
      "uploads",
      path.basename(oldCover)
    );

    try {
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    } catch (err) {
      console.log("⚠ Gagal hapus cover lama:", err.message);
    }
  }

  /**
   * UPDATE DB
   */
  await db.query(
    `UPDATE books
    SET title=?, author=?, price=?, genre=?, description=?, cover_url=?, updated_at=NOW()
    WHERE id=?`,
    [title, author, price, genre, description, cover_url, id]
  );

  const [rows] = await db.query("SELECT * FROM books WHERE id=?", [id]);
  return rows[0];
};

export const deleteBook = async (id) => {
  const [rows] = await db.query("SELECT cover_url FROM books WHERE id=?", [id]);
  if (rows.length === 0) return null;

  const oldCover = rows[0].cover_url;

  if (oldCover) {
    const oldPath = path.join(
      process.cwd(),
      "uploads",
      path.basename(oldCover)
    );

    if (fs.existsSync(oldPath)) {
      try {
        fs.unlinkSync(oldPath);
      } catch (err) {
        console.log("Error deleting file:", err.message);
      }
    }
  }

  await db.query("DELETE FROM books WHERE id=?", [id]);
  return true;
};
