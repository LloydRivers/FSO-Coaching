import { Schema, model, Document } from "mongoose";

export interface Blog {
  title: string;
  author: string;
  url: string;
  likes?: number;
}

interface IBlog extends Document, Blog {}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (_doc: Document, ret: Record<string, any>) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Blog = model<IBlog>("Blog", blogSchema);

export { Blog, IBlog };
