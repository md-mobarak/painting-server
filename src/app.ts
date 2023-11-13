import cors from "cors";
import express, { Application } from "express";
import { blogRuter } from "./module/blog/blog.route";
import { cartRuter } from "./module/cartItem/cartItem.route";
import { paintingRouter } from "./module/paintingService/paintService.route";
import { userRuter } from "./module/user/user.route";
// import { bookRouter } from "./module/book/book.route";
// import { categoryRouter } from "./module/category/category.route";
// import { orderRuter } from "./module/order/order.route";
// import { userRuter } from "./module/user/user.route";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// 1/categories/create-category
app.use("/api/v1/", userRuter);
app.use("/api/v1/", cartRuter);
app.use("/api/v1/painting/", paintingRouter);
app.use("/api/v1/blogs/", blogRuter);
// app.use("/api/v1/categories/", categoryRouter);
// app.use("/api/v1/books/", bookRouter);
// app.use("/api/v1/orders/", orderRuter);
export default app;
