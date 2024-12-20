import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

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

export const BlogController = {
  createBlog,
  getAllBlogs,
};
