import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/books", bookRoutes);

// Error handler (must be after routes)
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
