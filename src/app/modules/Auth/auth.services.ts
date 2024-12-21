import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";
const registerUserIntoDB = async ( payload: TUser) => {
    const user = await UserModel.isUserExistsByEmail(payload.email);
    if (user) {
      throw new AppError(httpStatus.CONFLICT, 'This user is already exists!');
    }
    
    const result = await UserModel.create(payload)
    return result;

  };
  const loginUser = async (payload: TLoginUser) => {
   
    const user = await UserModel.isUserExistsByEmail(payload.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    const userStatus = user?.isBlocked;
    if (userStatus) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }
    if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))){
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    const jwtPayload = {
        userId: user.email,
        role: user.role,
      };

        const Token = createToken(
          jwtPayload,
          config.jwt_access_secret as string,
          config.jwt_access_expires_in as string,
        );
    
        
      return { Token };
  };
  
  export const AuthServices={
   registerUserIntoDB,loginUser
}