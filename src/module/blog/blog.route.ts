import express from "express";
import auth from "../middleware/auth";
import { blogController } from "./blog.controller";
// import { cartController } from "./cartItem.controller";
// import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.post("/", auth, blogController.createBlogController);
router.get("/", auth, blogController.blogsGetController);
router.get("/user/", blogController.userGetAllBlogsController);
// router.get("/profile", auth, userController.userProfileGetController);
// router.get("/users/:id", userController.userSingleGetController);
// router.patch(
//   "/cart-update/:id",
//   cartController.userCartUpdateQuantityController
// );
router.delete("/:id", auth, blogController.blogsDeleteController);
// router.post("/auth/signup", userController.userCreateController);
// router.post("/auth/signin", userController.userLoginController);

export const blogRuter = router;
