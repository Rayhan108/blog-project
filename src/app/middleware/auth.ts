import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';



const auth = (...requireRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization?.split(" ")[1];
  //check if token sent from the client
  if(!token){
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
  }

  //check if the token is valid
  const decoded = jwt.verify(token,config.jwt_access_secret as string)as JwtPayload
// console.log(decoded);
const {role,userId}=decoded
  const user = await UserModel.isUserExistsByEmail(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //check if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

      if(requireRoles && !requireRoles.includes(role)){
        throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
      }
      req.user=decoded as JwtPayload;
      next();
       })
}
export default auth