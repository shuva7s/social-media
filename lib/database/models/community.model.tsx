import { model, models, Schema, Types } from "mongoose";
import { join } from "path";

export interface ICommunity extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  photo: string;
  members: Array<{
    _id: Types.ObjectId;
    role: "admin" | "member" | "editor";
  }>;
  joinRequests: Types.ObjectId[];
  posts: Types.ObjectId[];
  isPublic: boolean;
  createdAt: Date;
}

export interface ICommunityFrontEnd {
  _id: string;
  name: string;
  description: string;
  photo: string;
  members: number;
  isPublic: boolean;
}

const communitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  photo: { type: String, default: "" },
  members: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      role: {
        type: String,
        enum: ["admin", "member", "editor"],
        default: "member",
      },
    },
  ],
  joinRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Community = models?.Community || model("Community", communitySchema);

export default Community;
