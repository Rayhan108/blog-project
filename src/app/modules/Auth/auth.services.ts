import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";

const registerUserIntoDB = async ( payload: TUser) => {

    const userData: Partial<TUser> = {};
    userData.role = 'user';
    const user = new UserModel(payload);
    const result = await user.save();
    return result;

  };

  
  export const AuthServices={
   registerUserIntoDB
}