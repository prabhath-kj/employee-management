import adminController from "../controllers/adminController";
import express from "express";
const router = express.Router();

router.post("/login", adminController.login);

router.get("/get-users", adminController.getAllUsers);

router.post("/searchUser", adminController.getUser);

router.get("/delete-user/:id", adminController.deleteUser);

export default router;
