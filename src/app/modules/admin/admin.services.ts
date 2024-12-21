
import { BlogModel } from "../blog/blog.model";
import { UserModel } from "../user/user.model";

 const blogUser = async (id: string) => {
    const result = await UserModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      {
        new: true,
      },
    );
    return result;
  };

   const deleteBlog = async ( id: string) => {
      // console.log(id);
      const result = await BlogModel.findByIdAndDelete(id);
      return result;
    };

  export const AdminServices={
    blogUser,deleteBlog

  }