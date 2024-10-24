import { Schema, Types, model, models } from "mongoose";

export interface Creator {
  _id: string;
  username: string;
  photo: string;
}

export interface PostData {
  _id: string;
  creator: Creator;
  postImage: string;
  message: string;
  community: {
    isCommunityPost: boolean;
    communityName: string;
    communityId: string | null;
  };
  likes: string[];
  comments: any[];
  parentPost: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isLiked: boolean;
  editable: boolean;
}

export interface IPost extends Document {
  _id: Types.ObjectId;

  creator: string;
  postImage: string;
  message: string;

  community: {
    isCommunityPost: boolean;
    communityName: string;
    communityId: Types.ObjectId | null;
  };

  likes: Types.ObjectId[];
  comments: Types.ObjectId[];

  parentPost: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export type postDataTypeFrontEnd = {
  _id: string;
  creator: {
    _id: string;
    username: string;
    photo: string;
  };
  postImage: string;
  message: string;
  community: {
    isCommunityPost: boolean;
    communityName: string;
    communityId: string;
  };
  likes: string[];
  comments: string[];
  parentPost: string;
  createdAt: Date;
  updatedAt: Date;
};

const PostSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  postImage: { type: String, default: "" },
  message: { type: String, default: "" },

  community: {
    isCommunityPost: { type: Boolean, default: false },
    communityName: { type: String, default: "" },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      default: null,
    },
  },

  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);

export default Post;
