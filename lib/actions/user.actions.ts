"use server";
import { Types } from "mongoose";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { userInfo } from "./userInfo.action";
import { handleError } from "../utils";

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    throw new Error("ERROR OCCURED AT CREATE_USER SERVER ACTION", error);
  }
}

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User updation failed: USER NOT FOUND");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error: any) {
    throw new Error("ERROR OCCURED AT UPDATE_USER SERVER ACTION", error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User deletion failed: USER NOT FOUND");
    }
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error: any) {
    throw new Error("ERROR OCCURED AT DELETE_USER SERVER ACTION", error);
  }
}

export async function getUserObjectId() {
  try {
    await connectToDatabase();
    const { userId, userName, userMail } = await userInfo();
    if (!userId || !userName || !userMail)
      throw new Error("User not found: searchd user based on clerks data");
    const user = await User.findOne({
      clerkId: userId,
      email: userMail,
      username: userName,
    });
    return user._id.toString();
  } catch (error: any) {
    throw new Error("ERROR OCCURED AT GET_USER SERVER ACTION", error);
  }
}

export async function getUserDataFromObjectId(
  objectIdStr: string
): Promise<{ userImage: string; userName: string }> {
  const objectId = new Types.ObjectId(objectIdStr);

  const user = await User.findById(objectId).select("photo username");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    userImage: user.photo,
    userName: user.username,
  };
}

export async function getUserDataFromUserName(un: string) {
  try {
    await connectToDatabase();
    const { userName } = await userInfo();

    if (!userName) return { message: "invIdClerk" };

    const user = await User.findOne({ username: userName });
    if (!user) return { message: "unf" };

    return {
      message: "success",
      usersProfile: userName === un,
      userData: user,
    };
  } catch (error) {
    handleError(error);
    return { message: "swr" };
  }
}
