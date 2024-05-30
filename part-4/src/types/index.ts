import { Document, Schema } from "mongoose";

export interface Blog {
  title: string;
  author: string;
  url: string;
  likes?: number;
  user: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
}

export interface TestBlogType {
  title: string;
  author: string;
  url: string;
  likes?: number;
  user: {
    type: string;
    ref: string;
  };
}

export interface User {
  username: string;
  name: string;
  passwordHash: string;
  blogs: string[];
}
