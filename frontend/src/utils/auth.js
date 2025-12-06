// src/utils/auth.js

// SIMPAN TOKEN + USER DATA
export function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

// AMBIL TOKEN
export function getToken() {
  return localStorage.getItem("token");
}

// MENGECEK LOGIN
export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

// AMBIL USER
export function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}

// CEK ROLE ADMIN
export function isAdmin() {
  const u = getUser();
  return u && u.role === "admin";
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
