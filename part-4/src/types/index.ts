import { Document } from "mongoose";
export interface Blog {
  title: string;
  author: string;
  url: string;
  likes?: number;
}

export interface IBlog extends Document, Blog {}
