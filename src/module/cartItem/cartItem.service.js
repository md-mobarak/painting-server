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
exports.cartService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCartService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.cartItem.create({
        data,
    });
    return result;
});
const allCartGetService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.cartItem.findMany({});
    return result;
});
const userCartGetService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.cartItem.findMany({
        where: {
            userId: userId,
        },
        include: {
            service: true,
            user: true,
        },
    });
    return {
        result,
    };
});
const userCartUpdateQuantityService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.cartItem.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const userCartDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.cartItem.delete({ where: { id: id } });
    return result;
});
exports.cartService = {
    createCartService,
    allCartGetService,
    userCartGetService,
    userCartUpdateQuantityService,
    userCartDeleteService,
};
