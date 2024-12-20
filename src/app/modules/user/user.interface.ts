/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

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
    isUserExistsByCustomEmail(id: string): Promise<TUser>
    isUserExistsByCustomId(id: string): Promise<TUser>
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>,
  }