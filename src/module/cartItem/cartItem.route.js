"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRuter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const cartItem_controller_1 = require("./cartItem.controller");
// import { userController } from "./user.controller";
// import auth from "../../middlerware/auth";
// import { userController } from "./user.controller";
// import * as UserController from '../controllers/user.controller';
const router = express_1.default.Router();
router.post("/cart", auth_1.default, cartItem_controller_1.cartController.createCartController);
router.get("/user-cart", auth_1.default, cartItem_controller_1.cartController.userCartItemGetController);
router.get("/all-cart", auth_1.default, cartItem_controller_1.cartController.allCartGetController);
// router.get("/users/:id", userController.userSingleGetController);
router.patch("/cart-update/:id", cartItem_controller_1.cartController.userCartUpdateQuantityController);
router.delete("/cart/:id", cartItem_controller_1.cartController.userCartItemDeletedController);
// router.post("/auth/signup", userController.userCreateController);
// router.post("/auth/signin", userController.userLoginController);
exports.cartRuter = router;
