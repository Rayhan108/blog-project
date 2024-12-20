import express from 'express';
import { AuthValidation } from './auth.validaton';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';




const router = express.Router();


router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
  );

export const AuthRoutes = router;
