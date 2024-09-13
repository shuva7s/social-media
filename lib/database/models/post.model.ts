import { Schema, Types, model, models } from "mongoose";

export interface IPost extends Document {
  _id: Types.ObjectId;

  creator: string;
  postImage: string;
  message: string;

  likes: Types.ObjectId[];
  comments: Types.ObjectId[];

  parentPost: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  postImage: { type: String, default: "" },
  message: { type: String, default: "" },

  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);

export default Post;
