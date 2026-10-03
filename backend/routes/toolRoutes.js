import express from 'express';
import { getTools, recordToolUse, getAnalyticsOverview } from '../controllers/toolController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTools);
router.post('/:toolId/use', recordToolUse);
router.get('/analytics/overview', protect, getAnalyticsOverview);

export default router;
