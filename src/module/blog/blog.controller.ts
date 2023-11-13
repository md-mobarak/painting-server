import { blogServices } from "./blog.service";

const createBlogController = async (req: any, res: any) => {
  try {
    const userRole = req.user.role === "admin";
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

export const blogController = {
  createBlogController,
};

// const createCartController = async (req: any, res: any) => {
//     try {
//       const userRole = req.user.role === "user";
//       if (!userRole) {
//         return res.status(404).json({
//           success: true,
//           statusCode: 404,
//           message: "You are not User!",
//         });
//       }
//     //   const existingService = await prisma.cartItem.findFirst({
//     //     where: {
//     //       userId: req.body.userId,
//     //       serviceId: req.body.serviceId,
//     //     },
//     //   });
//       // console.log(existingService, "ata teke asce te");
//       if (existingService) {
//         // If the service already exists, you can increment its count by 1.
//         const result1 = await prisma.cartItem.update({
//           where: {
//             id: existingService.id,
//           },
//           data: {
//             quantity: {
//               increment: 1,
//             },
//           },
//         });
//         return res.status(200).json({
//           success: true,
//           statusCode: 200,
//           message: "Cart post successfully!",
//           data: result1,
//         });
//       } else {
//         const { id, quantity, userId, serviceId } = req.body;
//         const cart = { id, quantity, userId, serviceId };
//         const result = await cartService.createCartService(cart);
//         return res.status(200).json({
//           success: true,
//           statusCode: 200,
//           message: "Cart post successfully!",
//           data: result,
//         });
//       }
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         statusCode: 500,
//         message: "Cart not post successfully!",
//         err: err,
//       });
//     }
//   };
