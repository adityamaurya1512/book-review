import express from 'express';
import { addBook, getBooks, getBookDetails, searchBooks } from '../controllers/bookController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/books', authenticate, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookDetails);
router.get('/search', searchBooks);

export default router;
