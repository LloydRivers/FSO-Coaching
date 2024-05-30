import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

export const getAllUsers = async (request: Request, response: Response) => {
  const users = await User.find({});
  response.json(users);
};
