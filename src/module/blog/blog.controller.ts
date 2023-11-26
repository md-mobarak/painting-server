import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { blogServices } from "./blog.service";
const prisma = new PrismaClient();
const createBlogController: RequestHandler = async (req: any, res: any) => {
  try {
    // console.log(req.user.role)
    const userRole = req?.user?.role === "admin" || "super-admin";
    if (!userRole) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized: Only admins are allowed to create blog posts.",
      });
    }
    const blog = req.body;
    const result = await blogServices.blogPostService(blog);
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "blog post successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "blog not post successfully!",
      err: err,
    });
  }
};

const blogsGetController: RequestHandler = async (req: any, res: any) => {
  try {
    const userRole = req?.user?.role === "admin" || "super-admin";
    if (!userRole) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized: Only admins are allowed to get blogs.",
      });
    }
    const role = req?.user?.role;
    const { page = 1, size = 3 } = req.query;
    // console.log(req.user);
    // const filters: any = {
    //   AND: [],
    // };
    const skip = (Number(page) - 1) * Number(size);

    const total = await prisma?.blog?.count({
      // where: filters,
    });
    const totalPage = Math.ceil(total / Number(size));

    const allblog = await prisma?.blog?.findMany({
      // where: filters,
      skip,
      take: Number(size),
    });
    return res?.status(200)?.json({
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
      blogs: allblog?.reverse(),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "blog not get successfully!",
      err: err,
    });
  }
};

const userGetAllBlogsController: RequestHandler = async (
  req: any,
  res: any
) => {
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

    const result = await blogServices.allBlogsGetService();
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "blog Get successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "blog not get successfully!",
      err: err,
    });
  }
};

const blogsDeleteController: RequestHandler = async (req: any, res: any) => {
  try {
    // console.log(req.user.role);
    const userRole = req?.user?.role === "admin" || "super-admin";
    if (!userRole) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized: Only admins are allowed  blog delete.",
      });
    }
    const id = req.params.id;
    const result = await blogServices.blogDeleteService(id);
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "blog deleted successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "blog not deleted successfully!",
      err: err,
    });
  }
};

export const blogController = {
  createBlogController,
  blogsGetController,
  blogsDeleteController,
  userGetAllBlogsController,
};
