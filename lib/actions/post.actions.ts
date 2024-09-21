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

    const parentPostId = parentPost ? new Types.ObjectId(parentPost) : null;

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

export async function getPosts(type: "normal" | "users", page = 1) {
  try {
    await connectToDatabase();
    let limit = 6;
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

    let query: { parentPost: null; creator?: Types.ObjectId } = {
      parentPost: null,
    };

    if (type === "users") {
      query.creator = user._id; // Add creator condition only if type is "users"
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creator", "username photo")
      .lean();

    // Add like status to each post
    const postsWithLikeStatus = await Promise.all(
      posts.map(async (post) => {
        const isLiked = post.likes.some(
          (like: Types.ObjectId) => like.toString() === user._id.toString()
        );
        return {
          ...post,
          isLiked,
        };
      })
    );

    const totalPosts = await Post.countDocuments(query);
    const hasMore = totalPosts > page * limit;

    return {
      posts: JSON.parse(JSON.stringify(postsWithLikeStatus)),
      postsWithLikeStatus: JSON.parse(JSON.stringify(postsWithLikeStatus)),
      hasMore,
    };
  } catch (error) {
    handleError(error);
    throw new Error("Unable to fetch posts");
  }
}

export async function getComments(postId: string, page = 1, limit = 6) {
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

    // Fetch comments where parentPost matches the provided postId with pagination
    const comments = await Post.find({ parentPost: postId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creator", "username photo")
      .lean();

    // Add like status to each comment
    const commentsWithLikeStatus = await Promise.all(
      comments.map(async (comment) => {
        const isLiked = comment.likes.some(
          (like: Types.ObjectId) => like.toString() === user._id.toString()
        );
        return {
          ...comment,
          isLiked,
        };
      })
    );

    // Get the total count of comments for pagination
    const totalComments = await Post.countDocuments({ parentPost: postId });
    const hasMore = totalComments > page * limit;

    return {
      comments: JSON.parse(JSON.stringify(commentsWithLikeStatus)),
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Unable to fetch comments");
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

    return { success: true };
  } catch (error: any) {
    handleError(error);
    return { success: false, error: error.message };
  }
}

export async function getPostById(postId: string) {
  try {
    await connectToDatabase();
    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      return { success: false, error: "Error fetching you data" };
    }

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Convert postId to ObjectId
    const postObjectId = new Types.ObjectId(postId);

    // Fetch the single post by postId
    const post = await Post.findById(postObjectId).populate(
      "creator",
      "username photo"
    );

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    // Check if the current user liked the post
    const isLiked = post.likes.some(
      (like: Types.ObjectId) => like.toString() === user._id.toString()
    );

    return {
      success: true,
      postData: JSON.parse(JSON.stringify(post)),
      isLiked,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
