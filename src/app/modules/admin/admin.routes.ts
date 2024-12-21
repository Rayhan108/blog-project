import express from 'express';
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "../Auth/auth.validaton";
import { AdminController } from './admin.controller';
import auth from '../../middleware/auth';
import { updateBlogValidationSchema } from '../blog/blog.validation';
const router = express.Router();

router.patch('/users/:userId/block',
    auth('admin'),
    validateRequest(AuthValidation.updateRegisterUserValidationSchema),
    AdminController.blogUser,
  );

  router.delete(
    '/blogs/:id',
    auth('admin'),
    validateRequest(updateBlogValidationSchema),
    AdminController.deleteBlogByAdmin,
  );

  export const AdminRoutes = router;