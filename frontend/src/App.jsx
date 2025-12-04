import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import UploadBook from "./pages/UploadBook";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/Protectedroute";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/upload-book"
            element={
              <ProtectedRoute>
                <UploadBook />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route
            path="/edit-book/:id"
            element={
          <ProtectedRoute>
      <EditBook />
    </ProtectedRoute>
  }
/>

        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
