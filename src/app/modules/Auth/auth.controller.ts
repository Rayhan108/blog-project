import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


const registerUser=async(req:Request,res:Response)=>{
const result = await AuthServices.registerUserIntoDB(req.body);
sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data:result,
  });
}

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'login succesful',
      data: result
    });
  });
  



export const AuthControllers={
    registerUser,
    loginUser
}