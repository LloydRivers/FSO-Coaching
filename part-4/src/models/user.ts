import { Schema, model, Document } from "mongoose";

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (_doc: Document, ret: Record<string, any>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = model("User", userSchema);

export { User };
