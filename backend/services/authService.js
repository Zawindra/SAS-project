import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function createUser({ username, email, password }) {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashed]
  );
  return { id: result.insertId, username, email };
}

export async function findUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}
