import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { paintingService } from "./paintingService.service";

const prisma = new PrismaClient();
const CreatePaintingServiceController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const data: any = await req.body;
    const result = await paintingService.createPaintingService(data);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "painting created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to painting create",
      err: console.log(err),
    });
  }
};

const getPaintingServiceController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const {
      page = 1,
      size = 10,
      sortBy = "id",
      sortOrder = "asc",
      minPrice,
      maxPrice,
      category,
      search,
    } = req.query;

    // Define filter conditions
    const filters: any = {
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

    const total = await prisma.service.count({
      where: filters,
    });

    const totalPage = Math.ceil(total / Number(size));

    const services = await prisma.service.findMany({
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
  } catch (err) {
    return res.status(404).json({
      statusCode: 404,
      success: false,
      message: "Failed to get painting services",
      err: err,
    });
  }
};

const singleGetServiceController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    const id = await req?.params?.id;
    const result = await paintingService.singlePaintingService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "service single get successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to single product",
      err: err,
    });
  }
};

const deleteServiceController: RequestHandler = async (req: any, res: any) => {
  try {
    const isAdmin = req?.user?.role === "admin" || "super-admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = await req?.params?.id;
    const result = await paintingService.deletePaintingService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "service deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to book delete",
      err: err,
    });
  }
};

const paintingServiceUpdateController: RequestHandler = async (
  req: any,
  res: any
) => {
  try {
    // const isAdmin = req?.user?.role === "admin";
    // if (!isAdmin) {
    //   return res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id = await req?.params?.id;
    const data = req.body;
    const result = await paintingService.paintingServiceUpdate(data, id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "service Updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to service Updated",
      err: err,
    });
  }
};

export const paintingServiceController = {
  CreatePaintingServiceController,
  getPaintingServiceController,
  deleteServiceController,
  singleGetServiceController,
  paintingServiceUpdateController,
};
