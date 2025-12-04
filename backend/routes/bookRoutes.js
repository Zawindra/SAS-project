import express from "express";
import upload from "../middlewares/upload.js";
import authenticateToken from "../middlewares/authMiddleware.js";

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", upload.single("file"), createBook);
router.put("/:id", authenticateToken, upload.single("cover"), updateBook);
router.delete("/:id", authenticateToken, deleteBook);

export default router;
