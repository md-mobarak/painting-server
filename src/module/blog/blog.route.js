"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRuter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const blog_controller_1 = require("./blog.controller");
// import { cartController } from "./cartItem.controller";
// import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';
const router = express_1.default.Router();
router.post("/", auth_1.default, blog_controller_1.blogController.createBlogController);
router.get("/", auth_1.default, blog_controller_1.blogController.blogsGetController);
router.get("/user/", blog_controller_1.blogController.userGetAllBlogsController);
// router.get("/profile", auth, userController.userProfileGetController);
// router.get("/users/:id", userController.userSingleGetController);
// router.patch(
//   "/cart-update/:id",
//   cartController.userCartUpdateQuantityController
// );
router.delete("/:id", auth_1.default, blog_controller_1.blogController.blogsDeleteController);
// router.post("/auth/signup", userController.userCreateController);
// router.post("/auth/signin", userController.userLoginController);
exports.blogRuter = router;
