"use strict";
// import { PrismaClient, User } from "@prisma/client";
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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.create({
        data,
    });
    return result;
});
const userLoginService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return result;
});
const allUserGetService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({});
    return result;
});
const singleUserGet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const userProfileUpdate = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const userRoleUpdate = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            id: id,
        },
        data,
    });
    console.log(result);
    return result;
});
const userDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
});
const userProfileGetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
exports.userService = {
    singleUserGet,
    userProfileUpdate,
    createUserService,
    userProfileGetService,
    userDeleteService,
    userLoginService,
    allUserGetService,
    userRoleUpdate,
};
