import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, getToken } from "../utils/auth";

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      alert("Book deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete book!");
    }
  };

  if (!book) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Cover */}
        <div style={{ textAlign: "center" }}>
          <img
  src={
    book.cover_url
      ? `http://localhost:4000${book.cover_url}`
      : "https://via.placeholder.com/300x420.png?text=No+Cover"
  }
  style={{
    width: 250,
    height: 350,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 20,
  }}
/>

        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {book.title}
        </h1>

        <p style={{ textAlign: "center", fontSize: 18, color: "#555" }}>
          By <strong>{book.author}</strong>
        </p>

        <div
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 18,
            color: "#333",
          }}
        >
          <p>
            <strong>Genre:</strong> {book.genre || "-"}
          </p>
          <p>
            <strong>Year:</strong> {book.year || "-"}
          </p>
          <p>
            <strong>Price:</strong> Rp {parseInt(book.price).toLocaleString()}
          </p>
          <p>
            <strong>Discount:</strong> {book.discount}% 
          </p>
          <p>
            <strong>Description:</strong> {book.description || "No description"}
          </p>
        </div>

        {/* Action Buttons */}
        {isLoggedIn() && (
          <div
            style={{
              marginTop: 35,
              display: "flex",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <Link
              to={`/edit-book/${book.id}`}
              style={{
                padding: "12px 25px",
                background: "#0b63a8",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 16,
              }}
            >
              Edit Book
            </Link>

            <button
              onClick={handleDelete}
              style={{
                padding: "12px 25px",
                background: "#d9534f",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Delete Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}