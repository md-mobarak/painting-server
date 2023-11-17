import express from "express";
import { paintingServiceController } from "./paintingService.controller";
// import auth from "../../middlerware/auth";
// import { bookController } from "./book.controller";
// // import { categoryController } from "./category.controller";

const router = express.Router();
router.post(
  "/create-painting/",
  paintingServiceController.CreatePaintingServiceController
);
router.get("/service", paintingServiceController.getPaintingServiceController);
// router.get("/:categoryId/category", bookController.getByCategoryIdController);
router.get("/:id", paintingServiceController.singleGetServiceController);
router.patch(
  "/update-painting/:id",
  paintingServiceController.paintingServiceUpdateController
);
router.delete("/:id", paintingServiceController.deleteServiceController);

export const paintingRouter = router;
