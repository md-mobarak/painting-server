import { CartItem, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCartService = async (data: CartItem) => {
  const result = await prisma.cartItem.create({
    data,
  });
  return result;
};

const allCartGetService = async () => {
  const result = await prisma.cartItem.findMany({});
  return result;
};

const userCartGetService = async (userId: any) => {
  const result = await prisma.cartItem.findMany({
    where: {
      userId: userId,
    },
    include: {
      service: true,
      user: true,
    },
  });

  return {
    result,
  };
};

const userCartUpdateQuantityService = async (data: any, id: string) => {
  const result = await prisma.cartItem.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const userCartDeleteService = async (id: string) => {
  const result = await prisma.cartItem.delete({ where: { id: id } });
  return result;
};

export const cartService = {
  createCartService,
  allCartGetService,
  userCartGetService,
  userCartUpdateQuantityService,
  userCartDeleteService,
};
