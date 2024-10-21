import Communities from "@/app/(root)/communities/page";
import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
  communities: Array<{
    _id: Types.ObjectId;
    role: "admin" | "member" | "editor";
  }>;
  createdAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  communities: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Community", required: true },
      role: {
        type: String,
        enum: ["admin", "member", "editor"],
        default: "member",
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema);

export default User;
