import { model, models, Schema, Types } from "mongoose";

export interface ICommunity extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  photo: string;
  members: Array<{
    _id: Types.ObjectId;
    role: "admin" | "member";
  }>;
  posts: Types.ObjectId[];
  visibility: "public" | "private";
  createdAt: Date;
}

export interface ICommunityFrontEnd {
  _id: string;
  name: string;
  description: string;
  photo: string;
  members: number;
}

const communitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  photo: { type: String, default: "" },
  members: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  createdAt: { type: Date, default: Date.now },
});

const Community = models?.Community || model("Community", communitySchema);

export default Community;
