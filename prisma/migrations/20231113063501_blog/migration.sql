-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img_url" TEXT,
    "description" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
