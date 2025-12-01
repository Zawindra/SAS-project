import db from "../config/db.js";

export async function getBooks() {
  const [rows] = await db.query("SELECT * FROM books ORDER BY id DESC");
  return rows;
}

export async function getBookById(id) {
  const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return rows[0];
}

export async function createBook(data) {
  const { title, author, year = null, genre = null } = data;
  const [result] = await db.query(
    "INSERT INTO books (title, author, year, genre) VALUES (?, ?, ?, ?)",
    [title, author, year, genre]
  );
  return result.insertId;
}

export async function updateBook(id, data) {
  const { title = null, author = null, year = null, genre = null } = data;
  await db.query(
    "UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author), year = COALESCE(?, year), genre = COALESCE(?, genre) WHERE id = ?",
    [title, author, year, genre, id]
  );
}

export async function deleteBook(id) {
  await db.query("DELETE FROM books WHERE id = ?", [id]);
}
