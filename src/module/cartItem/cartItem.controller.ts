import { PrismaClient } from "@prisma/client";
import { cartService } from "./cartItem.service";
const prisma = new PrismaClient();
const createCartController = async (req: any, res: any) => {
  try {
    const userRole = req.user.role === "user";
    if (!userRole) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "You are not User!",
      });
    }
    const existingService = await prisma.cartItem.findFirst({
      where: {
        userId: req.body.userId,
        serviceId: req.body.serviceId,
      },
    });
    // console.log(existingService, "ata teke asce te");
    if (existingService) {
      // If the service already exists, you can increment its count by 1.
      const result1 = await prisma.cartItem.update({
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
    } else {
      const { id, quantity, userId, serviceId } = req.body;
      const cart = { id, quantity, userId, serviceId };
      const result = await cartService.createCartService(cart);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cart post successfully!",
        data: result,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Cart not post successfully!",
      err: err,
    });
  }
};

const allCartGetController = async (req: any, res: any) => {
  try {
    const superAdminRole = req.user.role === "super-Admin";
    if (!superAdminRole) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "You are not Super admin!",
      });
    }

    const result = await cartService.allCartGetService();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cart get successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: "Cart not post successfully!",
      err: err,
    });
  }
};
const userCartItemGetController = async (req: any, res: any) => {
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
    const result = await cartService.userCartGetService(userId);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User cart get successfully!",
      data: { result, userEmail, userId },
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: "Cart not get successfully!",
      err: err,
    });
  }
};

const userCartItemDeletedController = async (req: any, res: any) => {
  try {
    const id = await req.params.id;
    console.log(id);
    const cartItem = await prisma.cartItem.findUnique({ where: { id: id } });
    console.log(cartItem);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Cart not found. It may have been deleted.",
      });
    }

    const result = await cartService.userCartDeleteService(id);
    console.log(result);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "cart Deleted successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Cart not deleted successfully!",
      err: err,
    });
  }
};
const userCartUpdateQuantityController = async (req: any, res: any) => {
  try {
    const id = await req.params.id;

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

    const result = await cartService.userCartUpdateQuantityService(data, id);
    console.log(result);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "cart updated successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Cart not updated successfully!",
      err: err,
    });
  }
};

export const cartController = {
  createCartController,
  allCartGetController,
  userCartItemGetController,
  userCartItemDeletedController,
  userCartUpdateQuantityController,
};
