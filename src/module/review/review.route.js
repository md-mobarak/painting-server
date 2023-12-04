"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRuter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const review_controller_1 = require("./review.controller");
// import { blogController } from "./blog.controller";
// import { cartController } from "./cartItem.controller";
// import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';
const router = express_1.default.Router();
router.post("/", auth_1.default, review_controller_1.reviewController.createReviewController);
router.get("/", review_controller_1.reviewController.reviewsGetController);
// router.get("/profile", auth, userController.userProfileGetController);
router.delete("/:id", auth_1.default, review_controller_1.reviewController.reviewDeletedController);
router.get("/:serviceId", review_controller_1.reviewController.singleReviewGetController);
exports.reviewRuter = router;