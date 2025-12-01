import * as bookService from "../services/bookService.js";
import { bookSchema } from "../validations/bookSchema.js";

export const getAll = async (req, res, next) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (err) { next(err); }
};

export const getOne = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const validated = bookSchema.parse(req.body);
    const id = await bookService.createBook(validated);
    res.status(201).json({ id, ...validated });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const validated = bookSchema.partial().parse(req.body);
    await bookService.updateBook(req.params.id, validated);
    res.json({ id: req.params.id, ...validated });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) { next(err); }
};
