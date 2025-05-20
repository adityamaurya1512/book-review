import Review from '../models/Review.js';

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.create({
      book: req.params.id,
      user: req.user._id,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch {
    res.status(400).json({ message: 'You have already reviewed this book' });
  }
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not allowed' });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not allowed' });

  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};
