import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
const registerUserIntoDB = async ( payload: TUser) => {

    const result = await UserModel.create(payload)
    return result;

  };
  const loginUser = async (payload: TLoginUser) => {
    //check if the user is exists
    const user = await UserModel.isUserExistsByCustomId(payload.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }
   
    //check if the user is blocked
    const userStatus = user?.isBlocked;
    if (userStatus) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

  };
  
  export const AuthServices={
   registerUserIntoDB,loginUser
}