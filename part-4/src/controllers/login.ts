import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user";
import config from "../utils/config";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const hasPasswordHash = user.passwordHash || "";

  const passwordCorrect = await bcrypt.compare(password, hasPasswordHash);

  if (!passwordCorrect) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET as string, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
};
