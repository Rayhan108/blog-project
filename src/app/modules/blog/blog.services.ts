import { UserModel } from "../user/user.model";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB = async ( payload: TBlog,userId:string) => {

  const user = await UserModel.findOne({ email: userId });
  const {title,content}=payload;

  const blogData = {
    title,
    content,
    author: user?._id,
  };
    const result = await BlogModel.create(blogData)
    return result;

  };
  export const BlogServices={
createBlogIntoDB,
  }