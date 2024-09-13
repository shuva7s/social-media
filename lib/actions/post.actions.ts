"use server";

import { Types } from "mongoose";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { userInfo } from "./userInfo.action";

type CreatePostParams = {
  message: string;
  postImage: string;
  parentPost: string | null;
};

export async function createPost({
  message,
  postImage,
  parentPost,
}: CreatePostParams) {
  try {
    // Connect to the database
    await connectToDatabase();
    const { userId, userMail, userName } = await userInfo();

    if (!userId || !userMail || !userName) {
      return { message: "ids-not-found" };
    }

    // Find the user by email, username, and clerkId
    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return { message: "user-not-found" };
    }

    // Convert parentPost to ObjectId if it's a comment (i.e., not null)
    const parentPostId = parentPost ? new Types.ObjectId(parentPost) : null;

    // Create the new post
    const savedPost = await Post.create({
      creator: user._id,
      postImage,
      message,
      likes: [],
      comments: [],
      parentPost: parentPostId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Post created successfully:", savedPost);
    return { message: "success" };
  } catch (error) {
    handleError(error);
    return { message: "swr" };
  }
}

export async function getLatestPosts() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the latest 10 posts, sorting by createdAt in descending order
    const latestPosts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10) // Limit to 10 posts// Optional: Populate creator details
    return latestPosts;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw new Error("Unable to fetch latest posts");
  }
}
