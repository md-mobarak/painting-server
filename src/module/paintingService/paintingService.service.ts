import { PrismaClient, Service } from "@prisma/client";

const prisma = new PrismaClient();

const createPaintingService = async (data: Service) => {
  const result = await prisma.service.create({
    include: {
      bookings: true,
      reviews: true,
    },
    data,
  });
  return result;
};
const getPaintingService = async () => {
  const result = await prisma.service.findMany({});
  return result;
};
const singlePaintingService = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deletePaintingService = async (id: string) => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const paintingService = {
  createPaintingService,
  getPaintingService,
  deletePaintingService,
  singlePaintingService,
};
