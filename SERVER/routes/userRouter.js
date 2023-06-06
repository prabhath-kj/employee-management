import userController from "../controllers/user.Controller";
import upload from "../middleware/upload";
import auth from "../middleware/auth";
import express from "express";
const router = express.Router();

router.get("/", userController.homePage);

router
  .route("/login")
  .get(userController.loginPage)
  .post(userController.loginPost);

router
  .route("/signup")
  .get(userController.signupPage)
  .post(userController.signUP);

router.get("/get-user",auth,userController.getUser)

router.post("/update-profile",auth,userController.updateProfile)

router.post("/update-profilePic",upload.single("file"),auth,userController.updatePic)

export default router;
