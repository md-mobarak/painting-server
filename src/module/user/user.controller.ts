import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { Secret } from "jsonwebtoken";
import { userService } from "./user.service";
import { validateUser } from "./user.zodSchema";

const prisma = new PrismaClient();

const userCreateController: RequestHandler = async (req: any, res: any) => {
  try {
    const {
      id,
      username,
      email,
      password,
      location,
      role,
      contactNo,
      address,
      profileImg,
    } = req.body;
    // Hash the password using the pre-generated salt
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userData = {
      id,
      username,
      email,
      password: hashedPassword,
      location,
      role,
      contactNo,
      address,
      profileImg,
    };
    const uniqueEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (uniqueEmail) {
      // Email already exists, send a 409 Conflict status code and an error message
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: "Email is already registered",
      });
    }
    // Use the validation function
    const validationResult = validateUser(userData);
    // Hash the password before storing it
    if (validationResult.success) {
      // Data is valid
      const user: any = validationResult.data;
      // Continue with your code
      // Hash the password before storing it

      // user.password = hashedPassword;
      const createdUser = await userService.createUserService(user);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User created successfully!",
        data: createdUser,
      });
    } else {
      // Data is invalid
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid user data",
        errors: validationResult.error,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "User creation failed.",
      error: console.log(error),
    });
  }
};
const userLoginController: RequestHandler = async (req, res) => {
  const { email, password } = await req.body;
  try {
    // Check if the user with the provided email exists
    const user = await userService.userLoginService(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Authentication failed. User not found.",
      });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Authentication failed.Invalid password.",
      });
    }

    // Calculate a timestamp that is 1 year ago from the current time
    const oneYearAgoTimestamp = Math.floor(Date.now() / 1000) - 31536001; // 1 year + 1 second = 31536001 seconds
    // Generate an access token
    const accessToken = jwt.sign(
      {
        email: email,
        role: user.role,
        userId: user.id,
        iat: oneYearAgoTimestamp,
      },
      process.env.ACCESS_SECRET as Secret
      // { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      {
        email: email,
        role: user.role,
        userId: user.id,
        iat: oneYearAgoTimestamp,
      },
      process.env.REFRESH_SECRET as Secret
      // { expiresIn: "7d" }
    );
    // Set the refresh token as a cookie in the response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "UNAUTHORIZED USER",
      err: err,
    });
  }
};
const userGetController: RequestHandler = async (req: any, res: any) => {
  try {
    // const isAdmin = req?.user?.role === "admin";
    // // console.log(isAdmin, "ata req");
    // if (!isAdmin) {
    //   res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const role = req?.user?.role;
    const { page = 1, size = 6 } = req.query;
    // console.log(req.user);
    const filters: any = {
      AND: [],
    };
    const skip = (Number(page) - 1) * Number(size);

    const total = await prisma.user.count({
      // where: filters,
    });
    const totalPage = Math.ceil(total / Number(size));

    const allUsers = await prisma.user.findMany({
      where: filters,
      skip,
      take: Number(size),
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
        role,
      },
      user: allUsers.reverse(),
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user get",
      err: err,
    });
  }
};

const userSingleGetController: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const result = await userService.singleUserGet(req.params.id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Single get successfully",
      data: result,
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user get",
      err: err,
    });
  }
};
const userUpdateController: RequestHandler = async (req: any, res) => {
  try {
    // const isAdmin = req?.user?.role === "admin";
    // // console.log(isAdmin, "ata req");
    // if (!isAdmin) {
    //  return res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id = req.params.id;
    const data = req.body;

    const result = await userService.userProfileUpdate(data, id);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user update",
      err: err,
    });
  }
};
const deleteUserController: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "admin";
    // console.log(isAdmin, "ata req");
    if (!isAdmin) {
      res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = req.params.id;
    const result = await userService.userDeleteService(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user delete",
      err: err,
    });
  }
};

const userRoleUpdateContorller: RequestHandler = async (req: any, res) => {
  try {
    const isAdmin = req?.user?.role === "super-admin";
    console.log(isAdmin);
    if (!isAdmin) {
      return res.status(404).json({
        success: true,
        statusCode: 404,
        message: "Unauthorized access",
      });
    }
    const id = req.params.id;
    const data = req.body;
    const result = await userService.userProfileUpdate(data, id);
    console.log(result);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated role successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Failed to user role update",
      err: err,
    });
  }
};
const userProfileGetController: RequestHandler = async (req: any, res) => {
  try {
    const tokenUserId = req.user.userId;
    // const tokenRole = req.user.role;
    const result: any = await userService.userProfileGetService(tokenUserId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const userController = {
  userCreateController,
  userLoginController,
  userGetController,
  userProfileGetController,
  deleteUserController,
  userUpdateController,
  userSingleGetController,
  userRoleUpdateContorller,
};
