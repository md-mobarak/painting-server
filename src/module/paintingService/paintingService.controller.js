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
exports.paintingServiceController = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const paintingService_service_1 = require("./paintingService.service");
const prisma = new client_1.PrismaClient();
const CreatePaintingServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield req.body;
        const result = yield paintingService_service_1.paintingService.createPaintingService(data);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "painting created successfully",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Failed to painting create",
            err: console.log(err),
        });
    }
});
const getPaintingServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, size = 10, sortBy = "id", sortOrder = "asc", minPrice, maxPrice, category, search, } = req.query;
        // Define filter conditions
        const filters = {
            AND: [],
        };
        if (minPrice) {
            filters.AND.push({ price: { gte: parseFloat(minPrice.toString()) } });
        }
        if (maxPrice) {
            filters.AND.push({ price: { lte: parseFloat(maxPrice.toString()) } });
        }
        if (category) {
            filters.AND.push({ category: { equals: category.toString() } });
        }
        if (search) {
            filters.AND.push({
                OR: [{ title: { contains: search.toString(), mode: "insensitive" } }],
            });
        }
        const skip = (Number(page) - 1) * Number(size);
        const total = yield prisma.service.count({
            where: filters,
        });
        const totalPage = Math.ceil(total / Number(size));
        const services = yield prisma.service.findMany({
            where: filters,
            skip,
            take: Number(size),
            orderBy: {
                [sortBy]: sortOrder,
            },
        });
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Books fetched successfully",
            meta: {
                page: Number(page),
                size: Number(size),
                total,
                totalPage,
            },
            data: services,
        });
    }
    catch (err) {
        return res.status(404).json({
            statusCode: 404,
            success: false,
            message: "Failed to get painting services",
            err: err,
        });
    }
});
const singleGetServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = yield ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
        const result = yield paintingService_service_1.paintingService.singlePaintingService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "service single get successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to single product",
            err: err,
        });
    }
});
const deleteServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const isAdmin = ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin" || "super-admin";
        // console.log(isAdmin, "ata req");
        if (!isAdmin) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const id = yield ((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id);
        const result = yield paintingService_service_1.paintingService.deletePaintingService(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "service deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to book delete",
            err: err,
        });
    }
});
const paintingServiceUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        // const isAdmin = req?.user?.role === "admin";
        // if (!isAdmin) {
        //   return res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized access",
        //   });
        // }
        const id = yield ((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id);
        const data = req.body;
        const result = yield paintingService_service_1.paintingService.paintingServiceUpdate(data, id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "service Updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Failed to service Updated",
            err: err,
        });
    }
});
exports.paintingServiceController = {
    CreatePaintingServiceController,
    getPaintingServiceController,
    deleteServiceController,
    singleGetServiceController,
    paintingServiceUpdateController,
};
