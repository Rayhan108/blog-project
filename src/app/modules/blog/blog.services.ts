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
    const result = (await BlogModel.create(blogData)).populate('author')
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


  const updateBlogsIntoDB = async ( id: string,payload: Partial<TBlog>,) => {
    
    const result = await BlogModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).populate('author');
    return result;
  };

  const deleteBlogFromDB = async ( id: string) => {
    // console.log(id);
    const result = await BlogModel.findByIdAndDelete(id);
    return result;
  };



  export const BlogServices={
createBlogIntoDB,
getAllBlogsFromDB,
updateBlogsIntoDB,
deleteBlogFromDB
  }