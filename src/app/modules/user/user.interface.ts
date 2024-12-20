/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface User extends Model<TUser>{
      isUserExistsByCustomId(id: string): Promise<TUser>
  }