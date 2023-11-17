import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();
const reviewPostService = async (data: Review) => {
  const result = await prisma.review.create({
    data,
  });
  return result;
};
const allReviewsGetService = async () => {
  const result = await prisma.review.findMany({});
  return result;
};
const ReviewDeleteService = async (id: string) => {
  const result = await prisma.review.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const ReviewSingleGetService = async (serviceId: string) => {
  const result = await prisma.review.findMany({
    where: {
      serviceId: serviceId,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

export const reviewService = {
  reviewPostService,
  ReviewDeleteService,
  allReviewsGetService,
  ReviewSingleGetService,
};
