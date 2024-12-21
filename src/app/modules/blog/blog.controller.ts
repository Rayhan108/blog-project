import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { BlogModel } from './blog.model';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';

const createBlog = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await BlogServices.createBlogIntoDB(req.body, userId);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
};
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});


const updateBlogFromDB = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const{ userId }= req.user

  // Fetch the blog first to verify ownership
  const existingBlog = await BlogModel.findById(blogId);
  const author = await UserModel.findOne({email:userId});

  if (!existingBlog) {
    throw new AppError(httpStatus.NOT_FOUND,"Blog not found")
  }
// console.log(existingBlog?.author.toString());
// console.log(author?._id.toString());

  if (existingBlog?.author.toString() !== author?._id.toString()) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'You are not authorized to update this blog',
    });
  }


  const result = await BlogServices.updateBlogsIntoDB(
    blogId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
};









export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlogFromDB,
};
