import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser, getToken } from "../utils/auth";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/books/${id}`);
      setBook(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      alert("Book deleted!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete!");
    }
  };

  if (!book) return <div style={{ padding: 30 }}>Loading...</div>;

  const role = getUser()?.role;
  const discountedPrice = book.discount
    ? book.price - (book.price * book.discount) / 100
    : book.price;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#eef3f8",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          background: "#fff",
          padding: "40px 50px",
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: 30,
            background: "#e6f0ff",
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #bcd3ff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#0b63a8",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#d8e8ff")}
          onMouseOut={(e) => (e.target.style.background = "#e6f0ff")}
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Home
        </button>

        {/* KONTEN 2 KOLOM */}
        <div
          style={{
            display: "flex",
            gap: 50,
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >

          {/* COVER */}
          <div style={{ flex: "0 0 350px", textAlign: "center" }}>
            <div style={{ position: "relative", width: "100%" }}>
              {book.discount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "#e63946",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  -{book.discount}%
                </span>
              )}

              <img
                src={
                  book.cover_url
                    ? `http://localhost:4000${book.cover_url}`
                    : "https://via.placeholder.com/300x420.png?text=No+Cover"
                }
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  borderRadius: 15,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>

          {/* DETAIL */}
          <div style={{ flex: "1 1 500px" }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 5 }}>
              {book.title}
            </h1>

            <p style={{ fontSize: 18, color: "#666" }}>
              By <strong>{book.author}</strong>
            </p>

            {/* HARGA */}
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              {book.discount > 0 ? (
                <>
                  <p
                    style={{
                      fontSize: 22,
                      textDecoration: "line-through",
                      color: "#999",
                    }}
                  >
                    Rp {parseInt(book.price).toLocaleString()}
                  </p>

                  <p
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: "#1b8f3a",
                    }}
                  >
                    Rp {parseInt(discountedPrice).toLocaleString()}
                  </p>
                </>
              ) : (
                <p
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  Rp {parseInt(book.price).toLocaleString()}
                </p>
              )}
            </div>

            <div style={{ fontSize: 18, lineHeight: "1.6" }}>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Year:</strong> {book.year || "-"}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </div>

            {/* ACTION */}
            <div style={{ marginTop: 35 }}>
              {role === "admin" ? (
                <div style={{ display: "flex", gap: 15 }}>
                  <Link
                    to={`/edit-book/${book.id}`}
                    style={{
                      padding: "12px 30px",
                      background: "#0b63a8",
                      color: "#fff",
                      borderRadius: 10,
                      textDecoration: "none",
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    Edit Book
                  </Link>

                  <button
                    onClick={handleDelete}
                    style={{
                      padding: "12px 30px",
                      background: "#e63946",
                      color: "#fff",
                      borderRadius: 10,
                      border: "none",
                      fontSize: 17,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  style={{
                    padding: "16px 40px",
                    background: "#28a745",
                    color: "#fff",
                    borderRadius: 10,
                    border: "none",
                    fontSize: 20,
                    cursor: "pointer",
                    fontWeight: 700,
                    marginTop: 10,
                  }}
                >
                  Beli Buku
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
