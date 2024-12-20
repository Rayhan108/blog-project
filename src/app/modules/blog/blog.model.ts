import { model, Schema, } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
         type: String, 
         required: true 
        },
    content: {
         type: String,
         required: true 
        },
    author: { 
        type:Schema.Types.ObjectId,
        ref: "User", 
       
    },
    isPublished: { 
        type: Boolean,
         default: true
         },
    createdAt: {
         type: Date, 
         default: Date.now 
        },
    updatedAt: { 
        type: Date,
         default: Date.now
         },
  },
  {
    timestamps: true,
  },

);
  export const BlogModel = model<TBlog>("Blog", blogSchema);