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


export const AuthRoutes = router;
