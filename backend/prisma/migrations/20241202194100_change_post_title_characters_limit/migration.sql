/*
  Warnings:

  - You are about to alter the column `postTitle` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(84)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "postTitle" SET DATA TYPE VARCHAR(84);
