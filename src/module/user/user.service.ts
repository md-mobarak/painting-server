// import { PrismaClient, User } from "@prisma/client";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUserService = async (data: User) => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const userLoginService = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return result;
};
const allUserGetService = async () => {
  const result = await prisma.user.findMany({});
  return result;
};
const singleUserGet = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const userProfileUpdate = async (data: any, id: string) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const userDeleteService = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};
const userProfileGetService = async (id: string) => {
  const result = await prisma.user.findUnique({
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
};

export const userService = {
  singleUserGet,
  userProfileUpdate,
  createUserService,
  userProfileGetService,
  userDeleteService,
  userLoginService,
  allUserGetService,
};
