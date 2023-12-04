"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const blog_route_1 = require("./module/blog/blog.route");
const cartItem_route_1 = require("./module/cartItem/cartItem.route");
const paintService_route_1 = require("./module/paintingService/paintService.route");
const review_route_1 = require("./module/review/review.route");
const user_route_1 = require("./module/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// 1/categories/create-category
app.use("/api/v1/", user_route_1.userRuter);
app.use("/api/v1/", cartItem_route_1.cartRuter);
app.use("/api/v1/painting/", paintService_route_1.paintingRouter);
app.use("/api/v1/blogs/", blog_route_1.blogRuter);
app.use("/api/v1/review/", review_route_1.reviewRuter);
exports.default = app;
