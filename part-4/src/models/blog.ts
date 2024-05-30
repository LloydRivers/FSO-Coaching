import { Schema, model, Document } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: Document, ret: Record<string, any>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Blog = model("Blog", blogSchema);

export { Blog };
