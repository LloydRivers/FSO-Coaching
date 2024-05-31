import { Router } from "express";
import { createUser, getAllUsers, editUser } from "../controllers/users";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.put("/:id", editUser);

export default router;
