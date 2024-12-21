import express from 'express';
import { blogValidationSchema, updateBlogValidationSchema } from './blog.validation';
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
router.patch(
  '/:blogId',
  auth('user'),
  validateRequest(updateBlogValidationSchema),
  BlogController.updateBlogFromDB,
);

router.get('/', BlogController.getAllBlogs);







export const BlogRoutes = router;
