import express from 'express';
import { authUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.get('/me', protect, getUserProfile);

export default router;
