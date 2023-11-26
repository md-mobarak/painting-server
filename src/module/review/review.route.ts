import express from "express";
import auth from "../middleware/auth";
import { reviewController } from "./review.controller";
// import { blogController } from "./blog.controller";
// import { cartController } from "./cartItem.controller";
// import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.post("/", auth, reviewController.createReviewController);
router.get("/", reviewController.reviewsGetController);
// router.get("/profile", auth, userController.userProfileGetController);
router.delete("/:id", auth, reviewController.reviewDeletedController);
router.get("/:serviceId", reviewController.singleReviewGetController);

export const reviewRuter = router;
