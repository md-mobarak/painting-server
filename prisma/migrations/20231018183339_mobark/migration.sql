/*
  Warnings:

  - You are about to drop the column `name` on the `Service` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `available` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "name",
ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
