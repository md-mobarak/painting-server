import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { reviewService } from "./review.service";

const prisma = new PrismaClient();
const createReviewController: RequestHandler = async (req: any, res: any) => {
  try {
    // const userRole = req?.user?.role === "admin" || "super-admin";
    // if (userRole) {
    //   return res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized: Only admins are allowed to create blog posts.",
    //   });
    // }
    const data = req.body;
    const result = await reviewService.reviewPostService(data);
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "Review post successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Review not post successfully!",
      err: err,
    });
  }
};
const singleReviewGetController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const serviceId = req.params.serviceId;
    const result = await reviewService.ReviewSingleGetService(serviceId);
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "Review get successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Review not get successfully!",
      err: err,
    });
  }
};
const reviewsGetController: RequestHandler = async (req: any, res: any) => {
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

    const total = await prisma?.review?.count({
      // where: filters,
    });
    const totalPage = Math.ceil(total / Number(size));

    const allReviews = await prisma?.review?.findMany({
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
      blogs: allReviews?.reverse(),
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
const reviewDeletedController: RequestHandler = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const result = await reviewService.ReviewDeleteService(id);
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "Review deleted successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Review not deleted successfully!",
      err: err,
    });
  }
};

export const reviewController = {
  createReviewController,
  reviewsGetController,
  reviewDeletedController,
  singleReviewGetController,
};
