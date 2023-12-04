"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const client_1 = require("@prisma/client");
const review_service_1 = require("./review.service");
const prisma = new client_1.PrismaClient();
const createReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userRole = (yield ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role)) === "admin" || "super-admin";
        if (!userRole) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Unauthorized: Only user are allowed to comment posts.",
            });
        }
        const data = yield req.body;
        const result = yield review_service_1.reviewService.reviewPostService(data);
        return res.status(200).json({
            success: false,
            statusCode: 200,
            message: "Review post successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Review not post successfully!",
            err: err,
        });
    }
});
const singleReviewGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.serviceId;
        const result = yield (review_service_1.reviewService === null || review_service_1.reviewService === void 0 ? void 0 : review_service_1.reviewService.ReviewSingleGetService(serviceId));
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Single Review get successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Single Review not get successfully!",
            err: err,
        });
    }
});
const reviewsGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        // const userRole = req?.user?.role === "admin" || "super-admin";
        // if (!userRole) {
        //   return res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized: Only admins are allowed to get blogs.",
        //   });
        // }
        const role = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role;
        const { page = 1, size = 3 } = req.query;
        // console.log(req.user);
        // const filters: any = {
        //   AND: [],
        // };
        const skip = (Number(page) - 1) * Number(size);
        const total = yield ((_c = prisma === null || prisma === void 0 ? void 0 : prisma.review) === null || _c === void 0 ? void 0 : _c.count({
        // where: filters,
        }));
        const totalPage = Math.ceil(total / Number(size));
        const allReviews = yield ((_d = prisma === null || prisma === void 0 ? void 0 : prisma.review) === null || _d === void 0 ? void 0 : _d.findMany({
            // where: filters,
            skip,
            take: Number(size),
            include: {
                user: true,
                service: true,
            },
        }));
        return (_e = res === null || res === void 0 ? void 0 : res.status(200)) === null || _e === void 0 ? void 0 : _e.json({
            success: true,
            statusCode: 200,
            message: "Blog fetched successfully",
            meta: {
                page: Number(page),
                size: Number(size),
                total,
                totalPage,
                role,
            },
            review: allReviews === null || allReviews === void 0 ? void 0 : allReviews.reverse(),
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "blog not get successfully!",
            err: err,
        });
    }
});
const reviewDeletedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    // console.log(req.user);
    try {
        if (((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.role) === "user") {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Unauthorized: Only user are allowed to review deleted.",
            });
        }
        const id = yield req.params.id;
        const result = yield review_service_1.reviewService.ReviewDeleteService(id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Review deleted successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Review not deleted successfully!",
            err: err,
        });
    }
});
exports.reviewController = {
    createReviewController,
    reviewsGetController,
    reviewDeletedController,
    singleReviewGetController,
};
