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
exports.paintingService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPaintingService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.create({
        include: {
            bookings: true,
            reviews: true,
        },
        data,
    });
    return result;
});
const getPaintingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findMany({});
    return result;
});
const singlePaintingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const deletePaintingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
});
const paintingServiceUpdate = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
exports.paintingService = {
    createPaintingService,
    getPaintingService,
    deletePaintingService,
    singlePaintingService,
    paintingServiceUpdate,
};
