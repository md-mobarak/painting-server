import express from "express";
import auth from "../middleware/auth";
import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get("/users", auth, userController.userGetController);
router.get("/profile", auth, userController.userProfileGetController);
router.get("/users/:id", userController.userSingleGetController);
router.patch("/users/:id", userController.userUpdateController);
router.patch("/users/role/:id", auth, userController.userRoleUpdateContorller);
router.delete("/users/:id", auth, userController.deleteUserController);
router.post("/auth/signup", userController.userCreateController);
router.post("/auth/signin", userController.userLoginController);

export const userRuter = router;
