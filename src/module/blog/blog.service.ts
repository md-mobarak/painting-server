import { Blog, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const blogPostService = async (data: Blog) => {
  const result = await prisma.blog.create({
    data,
  });
  return result;
};
const allBlogsGetService = async () => { 
const result = await prisma.blog.findMany({})
return result
}
const blogDeleteService = async (id: string) => {
  const result = await prisma.blog.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const blogServices = {
  blogPostService,
  blogDeleteService,
  allBlogsGetService
};
