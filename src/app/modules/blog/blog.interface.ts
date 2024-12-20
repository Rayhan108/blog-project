import { Types } from "mongoose";

export type TBlog ={
    title: string; 
    content: string; 
    author: Types.ObjectId;
    isPublished: boolean; 
    createdAt: Date;
    updatedAt: Date; 
  }