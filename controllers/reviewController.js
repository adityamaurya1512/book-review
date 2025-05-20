import Book from '../models/Book.js';
import Review from '../models/Review.js';

export const addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
};

export const getBookDetails = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const reviews = await Review.find({ book: book._id });
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : 0;

  res.json({ book, avgRating, reviews });
};

export const searchBooks = async (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q, 'i');
  const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
  res.json(books);
};
