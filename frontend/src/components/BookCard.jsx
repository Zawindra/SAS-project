import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      to={`/book/${book.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "0.2s",
        }}
      >
        <img
  src={
    book.cover_url
      ? `http://localhost:4000${book.cover_url}`
      : "https://via.placeholder.com/200x280.png?text=No+Cover"
  }
  style={{
    width: "100%",
    height: 260,
    objectFit: "cover",
    borderRadius: 10,
  }}
/>


        <h3 style={{ marginTop: 12, fontSize: 18, fontWeight: 700 }}>
          {book.title}
        </h3>

        <p style={{ margin: "2px 0", color: "#666" }}>{book.author}</p>

        <p style={{ marginTop: 8, fontWeight: 600 }}>
          Rp {parseInt(book.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}