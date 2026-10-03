import express from 'express';
import {
  getPosts,
  getAdminPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.get('/admin/all', protect, getAdminPosts);
router.get('/slug/:slug', getPostBySlug);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
