import { Blog, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const blogPostService = async (data: Blog) => {
  const result = await prisma.blog.create({
    data,
  });
  return result;
};

export const blogServices = {
  blogPostService,
};
