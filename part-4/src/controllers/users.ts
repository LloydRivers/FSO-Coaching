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
  const users = await User.find({}).populate("blogs", {
    title: 1,
  });
  response.json(users);
};

export const editUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;

  if (!id || !name) {
    return response
      .status(400)
      .json({ error: "User ID and name are required" });
  }

  const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });

  if (!updatedUser) {
    return response.status(404).json({ error: "User not found" });
  }

  response.json(updatedUser);
};
