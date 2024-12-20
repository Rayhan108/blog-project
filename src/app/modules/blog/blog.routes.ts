import express from 'express';
import { blogValidationSchema } from './blog.validation';
import { BlogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';




const router = express.Router();


router.post(
  '/',
  auth('user'),
  validateRequest(blogValidationSchema),
  BlogController.createBlog,
);
router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
