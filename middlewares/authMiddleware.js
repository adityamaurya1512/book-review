import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded_user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded_user.id).select('-password');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
