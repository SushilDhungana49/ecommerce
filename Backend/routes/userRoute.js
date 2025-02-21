import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  subscription,
  addToCart,
  updatePromo,
  usedPromo,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/subscription", subscription);
userRouter.post("/addtocart", addToCart);
userRouter.post("/updatepromo", updatePromo);
userRouter.post("/usedPromo", usedPromo);

export default userRouter;
