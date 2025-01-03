import { model, Schema } from "mongoose";
import { TUser, User } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'
const userSchema = new Schema<TUser,User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:0
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });
 
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await UserModel.findOne({ email }).select('+password');
  };

  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };

export const UserModel = model<TUser,User>("User", userSchema);
