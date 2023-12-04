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
exports.blogController = void 0;
const client_1 = require("@prisma/client");
const blog_service_1 = require("./blog.service");
const prisma = new client_1.PrismaClient();
const createBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log(req.user.role)
        const userRole = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" || "super-admin";
        if (!userRole) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized: Only admins are allowed to create blog posts.",
            });
        }
        const blog = req.body;
        const result = yield blog_service_1.blogServices.blogPostService(blog);
        return res.status(200).json({
            success: false,
            statusCode: 200,
            message: "blog post successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "blog not post successfully!",
            err: err,
        });
    }
});
const blogsGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    try {
        const userRole = ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin" || "super-admin";
        if (!userRole) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized: Only admins are allowed to get blogs.",
            });
        }
        const role = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role;
        const { page = 1, size = 3 } = req.query;
        // console.log(req.user);
        // const filters: any = {
        //   AND: [],
        // };
        const skip = (Number(page) - 1) * Number(size);
        const total = yield ((_d = prisma === null || prisma === void 0 ? void 0 : prisma.blog) === null || _d === void 0 ? void 0 : _d.count({
        // where: filters,
        }));
        const totalPage = Math.ceil(total / Number(size));
        const allblog = yield ((_e = prisma === null || prisma === void 0 ? void 0 : prisma.blog) === null || _e === void 0 ? void 0 : _e.findMany({
            // where: filters,
            skip,
            take: Number(size),
        }));
        return (_f = res === null || res === void 0 ? void 0 : res.status(200)) === null || _f === void 0 ? void 0 : _f.json({
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
            blogs: allblog === null || allblog === void 0 ? void 0 : allblog.reverse(),
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
const userGetAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user.role);
        // const userRole = req?.user?.role === "admin" || "super-admin";
        // if (!userRole) {
        //   return res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized: Only admins are allowed  blog delete.",
        //   });
        // }
        const result = yield blog_service_1.blogServices.allBlogsGetService();
        return res.status(200).json({
            success: false,
            statusCode: 200,
            message: "blog Get successfully!",
            data: result,
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
const blogsDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        // console.log(req.user.role);
        const userRole = ((_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.role) === "admin" || "super-admin";
        if (!userRole) {
            return res.status(404).json({
                success: true,
                statusCode: 404,
                message: "Unauthorized: Only admins are allowed  blog delete.",
            });
        }
        const id = req.params.id;
        const result = yield blog_service_1.blogServices.blogDeleteService(id);
        return res.status(200).json({
            success: false,
            statusCode: 200,
            message: "blog deleted successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "blog not deleted successfully!",
            err: err,
        });
    }
});
exports.blogController = {
    createBlogController,
    blogsGetController,
    blogsDeleteController,
    userGetAllBlogsController,
};
