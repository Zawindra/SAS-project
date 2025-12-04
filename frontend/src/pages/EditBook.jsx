import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);

  // AMBIL DATA LAMA BUKU
  useEffect(() => {
    axios.get(`http://localhost:4000/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPrice(res.data.price);
        setGenre(res.data.genre);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("author", author);
    form.append("price", price);
    form.append("genre", genre);
    form.append("description", description);
    if (cover) form.append("cover", cover);

    try {
      await axios.put(
        `http://localhost:4000/api/books/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Book updated successfully!");
      navigate(`/book/${id}`);
    } catch (err) {
      console.log(err);
      alert("Failed to update.");
    }
  };

  if (!book) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center", color: "#0b63a8" }}>
        Edit Book
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
          required
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={inputStyle}>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Education">Education</option>
          <option value="Biography">Biography</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: 120 }}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px 0",
            background: "#0b63a8",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: 6,
  border: "1px solid #d0d7e2",
};