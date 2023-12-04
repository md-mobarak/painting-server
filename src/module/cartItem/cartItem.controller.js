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
exports.cartController = void 0;
const client_1 = require("@prisma/client");
const cartItem_service_1 = require("./cartItem.service");
const prisma = new client_1.PrismaClient();
const createCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.user.role === "user";
        if (!userRole) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "You are not User!",
            });
        }
        const existingService = yield prisma.cartItem.findFirst({
            where: {
                userId: req.body.userId,
                serviceId: req.body.serviceId,
            },
        });
        // console.log(existingService, "ata teke asce te");
        if (existingService) {
            // If the service already exists, you can increment its count by 1.
            const result1 = yield prisma.cartItem.update({
                where: {
                    id: existingService.id,
                },
                data: {
                    quantity: {
                        increment: 1,
                    },
                },
            });
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Cart post successfully!",
                data: result1,
            });
        }
        else {
            const { id, quantity, userId, serviceId } = req.body;
            const cart = { id, quantity, userId, serviceId };
            const result = yield cartItem_service_1.cartService.createCartService(cart);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Cart post successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Cart not post successfully!",
            err: err,
        });
    }
});
const allCartGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superAdminRole = req.user.role === "admin" || "super-admin";
        if (!superAdminRole) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "You are not Super admin!",
            });
        }
        const result = yield cartItem_service_1.cartService.allCartGetService();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cart get successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: true,
            statusCode: 500,
            message: "Cart not post successfully!",
            err: err,
        });
    }
});
const userCartItemGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const userEmail = req.user.email;
        if (!userId) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized access",
            });
        }
        const result = yield cartItem_service_1.cartService.userCartGetService(userId);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User cart get successfully!",
            data: { result, userEmail, userId },
        });
    }
    catch (err) {
        return res.status(500).json({
            success: true,
            statusCode: 500,
            message: "Cart not get successfully!",
            err: err,
        });
    }
});
const userCartItemDeletedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield req.params.id;
        console.log(id);
        const cartItem = yield prisma.cartItem.findUnique({ where: { id: id } });
        console.log(cartItem);
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Cart not found. It may have been deleted.",
            });
        }
        const result = yield cartItem_service_1.cartService.userCartDeleteService(id);
        console.log(result);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "cart Deleted successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Cart not deleted successfully!",
            err: err,
        });
    }
});
const userCartUpdateQuantityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield req.params.id;
        // const cartItem = await prisma.cartItem.findUnique({ where: { id: id } });
        // console.log(cartItem);
        // if (!cartItem) {
        //   return res.status(404).json({
        //     success: false,
        //     statusCode: 404,
        //     message: "Cart not found. It may have been deleted.",
        //   });
        // }
        const data = req.body;
        const result = yield cartItem_service_1.cartService.userCartUpdateQuantityService(data, id);
        console.log(result);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "cart updated successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Cart not updated successfully!",
            err: err,
        });
    }
});
exports.cartController = {
    createCartController,
    allCartGetController,
    userCartItemGetController,
    userCartItemDeletedController,
    userCartUpdateQuantityController,
};
