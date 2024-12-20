import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const registerUser=async(req:Request,res:Response)=>{


const result = await AuthServices.registerUserIntoDB(req.body);
sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
}

export const AuthControllers={
    registerUser
}