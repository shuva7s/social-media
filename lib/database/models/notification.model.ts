import { Schema, model, Types, models } from "mongoose";

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification =
  models?.Notification || model("Notification", NotificationSchema);

export default Notification;
