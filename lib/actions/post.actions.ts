"use server";

import { Types } from "mongoose";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { userInfo } from "./userInfo.action";
import { revalidatePath } from "next/cache";

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

export async function getPosts(type: "normal" | "users") {
  try {
    await connectToDatabase();
    if (type === "users") {
      const { userId, userName, userMail } = await userInfo();

      if (!userId || !userMail || !userName) {
        throw new Error("ids-not-found");
      }

      const user = await User.findOne({
        email: userMail,
        username: userName,
        clerkId: userId,
      });

      if (!user) {
        throw new Error("user-not-found");
      }

      const posts = await Post.find({
        creator: user._id,
      })
        .sort({ createdAt: -1 })
        .limit(10);

      return posts;
    } else {
      const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
      return posts;
    }
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw new Error("Unable to fetch latest posts");
  }
}

export async function getPostLikeStatus(
  postId: Types.ObjectId
): Promise<boolean> {
  try {
    // Connect to the database
    await connectToDatabase();

    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      throw new Error("ids-not-found");
    }

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      throw new Error("user-not-found");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("post-not-found");
    }

    const isLiked = post.likes.some(
      (like: Types.ObjectId) => like.toString() === user._id.toString()
    );

    return isLiked;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw new Error("Unable to fetch latest posts");
  }
}

export async function updateLikeStatus(postId: string, isLiked: boolean) {
  try {
    await connectToDatabase();

    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      throw new Error("ids-not-found");
    }

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      throw new Error("user-not-found");
    }

    const postObjectId = new Types.ObjectId(postId);

    const post = await Post.findById(postObjectId);
    if (!post) {
      throw new Error("post-not-found");
    }

    const userObjectId = user._id;
    const hasLiked = post.likes.some((id: Types.ObjectId) =>
      id.equals(userObjectId)
    );

    if (isLiked && !hasLiked) {
      post.likes.push(userObjectId);
    } else if (!isLiked && hasLiked) {
      post.likes = post.likes.filter(
        (id: Types.ObjectId) => !id.equals(userObjectId)
      );
    }

    await post.save();

    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (error: any) {
    handleError(error);
    return { success: false, error: error.message };
  }
}
