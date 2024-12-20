/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser ={
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface User extends Model<TUser>{
    isUserExistsByEmail(id: string): Promise<TUser>
    isUserExistsByCustomId(id: string): Promise<TUser>
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>,
  }
  export type TUserRole = keyof typeof USER_ROLE;