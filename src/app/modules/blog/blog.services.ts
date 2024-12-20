import QueryBuilder from "../../builder/queryBuilder";
import { UserModel } from "../user/user.model";
import { BlogSearchableFields } from "./blog.constant";
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
  const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(BlogModel.find()
    .populate('author'),query)
     .search(BlogSearchableFields)
    .filter()
    .sortBy()
    const result = await blogQuery.modelQuery;
    return result;
  };
  export const BlogServices={
createBlogIntoDB,
getAllBlogsFromDB
  }