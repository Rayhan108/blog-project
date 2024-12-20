import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.services";
import httpStatus from "http-status";



const createBlog=async(req:Request,res:Response)=>{

const {userId}=req.user;
  const result = await BlogServices.createBlogIntoDB(req.body,userId);
    sendResponse(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: httpStatus.CREATED,
        data: result,
      });
    
    }
    export const BlogController={
createBlog,
    }