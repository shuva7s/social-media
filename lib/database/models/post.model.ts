import { Schema, Types, model, models } from "mongoose";

export interface IPost extends Document {
  _id: Types.ObjectId;
  creator: string;
  postImage: string;
  message: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  parentPost: Types.ObjectId;
}

const PostSchema = new Schema({
  creator: { type: String, required: true },
  postImage: { type: String, default: "" },
  message: { type: String, required: "" },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  parentPost: { type: Schema.Types.ObjectId, ref: "Post", default: null },
});

const Post = models?.Post || model("Post", PostSchema);

export default Post;
