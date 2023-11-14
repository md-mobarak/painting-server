import { blogServices } from "./blog.service";

const createBlogController = async (req: any, res: any) => {
  try {
    const userRole = req.user.role === "admin";
    console.log(userRole);

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
