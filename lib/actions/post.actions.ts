"use server";

import { Types } from "mongoose";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { userInfo } from "./userInfo.action";
import { UTApi } from "uploadthing/server";
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
    await connectToDatabase();
    const { userId, userMail, userName } = await userInfo();
    if (!userId || !userMail || !userName) {
      return { success: false, message: "Invalid ids" };
    }
    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return { success: false, message: "User not found" };
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

    await savedPost.save();

    revalidatePath("/");
    return {
      success: true,
      message: `${parentPostId ? "Comment" : "Post"} created successfully`,
      userName: user.username,
      postId: savedPost._id,
    };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
type UpdatePostParams = {
  postId: string;
  username?: string;
  message: string;
  postImage: string;
};

export async function updatePost({
  postId,
  username,
  message,
  postImage,
}: UpdatePostParams) {
  try {
    await connectToDatabase();

    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }
    post.message = message;
    post.updatedAt = new Date();

    if (post.postImage !== "") {
      let oldImageKey = post.postImage.substring(18);
      //remove
      console.log("old image key", oldImageKey);
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(oldImageKey);
      } catch (error) {
        return {
          success: false,
          message: "Error deleting image from uploadthing",
        };
      }
    }
    post.postImage = postImage;
    await post.save();
    revalidatePath("/");
    revalidatePath(`/${username}/post/${postId}`);
    return {
      success: true,
      message: `${!post.parentPost ? "Post" : "Comment"} updated successfully`,
    };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function deletePost({
  postId,
  isPost,
}: {
  postId: string;
  isPost: boolean;
}) {
  try {
    await connectToDatabase();

    const post = await Post.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    // Check if the post has an image and delete it from uploadthing
    if (post.postImage !== "") {
      let oldImageKey = post.postImage.substring(18);
      // Remove image from Uploadthing
      console.log("old image key", oldImageKey);
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(oldImageKey);
      } catch (error) {
        return {
          success: false,
          message: "Error deleting image from uploadthing",
        };
      }
    }

    await Post.deleteMany({ parentPost: postId });

    // Delete the post itself
    await Post.findByIdAndDelete(postId);

    if (isPost) {
      revalidatePath("/");
    }

    return {
      success: true,
      message: `${
        isPost
          ? "Post and the related comments deleted successfully"
          : "Comment deleted successfully"
      }`,
    };
  } catch (error) {
    return { success: false, message: "Error deleting post and comments" };
  }
}

export async function getPosts(type: "normal" | "users", page = 1) {
  try {
    await connectToDatabase();
    const limit = 6;
    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      return { success: false, error: "Error fetching your data" };
    }

    const user = await User.findOne({
      email: userMail,
      username: userName,
      clerkId: userId,
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const query: { parentPost: null; creator?: Types.ObjectId } = {
      parentPost: null,
    };

    if (type === "users") {
      query.creator = user._id;
    }

    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creator", "username photo")
      .lean();

    const postsWithStatus = posts.map((post) => {
      const isLiked = post.likes.some(
        (like: Types.ObjectId) => like.toString() === user._id.toString()
      );

      if (post.communityId) {
        delete post.communityId.members;
      }

      return {
        ...post,
        isLiked,
      };
    });

    const totalPosts = await Post.countDocuments(query);
    const hasMore = totalPosts > page * limit;

    return {
      success: true,
      posts: JSON.parse(JSON.stringify(postsWithStatus)),
      hasMore,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
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
    const comments = await Post.find({ parentPost: postId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creator", "username photo")
      .lean();

    const commentsWithLikeStatus = await Promise.all(
      comments.map(async (comment) => {
        const isLiked = comment.likes.some(
          (like: Types.ObjectId) => like.toString() === user._id.toString()
        );
        const editable = comment.creator._id.toString() === user._id.toString();
        return {
          ...comment,
          isLiked,
          editable,
        };
      })
    );

    const totalComments = await Post.countDocuments({ parentPost: postId });
    const hasMore = totalComments > page * limit;

    return {
      comments: JSON.parse(JSON.stringify(commentsWithLikeStatus)),
      hasMore,
    };
  } catch (error) {
    //TODO: error handling
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
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    handleError(error);
    return { success: false, error: error.message };
  }
}

export async function checkUserAccessToPostFunction(postId: string) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(postId)) {
      return {
        success: false,
        message: "Invalid postId",
      };
    }

    const { userId, userName, userMail } = await userInfo();

    if (!userId || !userMail || !userName) {
      return { success: false, message: "Error fetching your data" };
    }

    const user = await User.findOne({
      clerkId: userId,
      email: userMail,
      username: userName,
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const post = await Post.findOne({ _id: postId, parentPost: null })
      .select("-comments")
      .populate("creator", "username photo");

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const isLiked = post.likes.some(
      (like: Types.ObjectId) => like.toString() === user._id.toString()
    );

    const editable = post.creator?._id.toString() === user._id.toString();

    return {
      success: true,
      postData: JSON.parse(JSON.stringify(post)),
      isLiked,
      editable,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
