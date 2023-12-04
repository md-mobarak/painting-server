"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintingRouter = void 0;
const express_1 = __importDefault(require("express"));
const paintingService_controller_1 = require("./paintingService.controller");
// import auth from "../../middlerware/auth";
// import { bookController } from "./book.controller";
// // import { categoryController } from "./category.controller";
const router = express_1.default.Router();
router.post("/create-painting/", paintingService_controller_1.paintingServiceController.CreatePaintingServiceController);
router.get("/service", paintingService_controller_1.paintingServiceController.getPaintingServiceController);
// router.get("/:categoryId/category", bookController.getByCategoryIdController);
router.get("/:id", paintingService_controller_1.paintingServiceController.singleGetServiceController);
router.patch("/update-painting/:id", paintingService_controller_1.paintingServiceController.paintingServiceUpdateController);
router.delete("/:id", paintingService_controller_1.paintingServiceController.deleteServiceController);
exports.paintingRouter = router;
