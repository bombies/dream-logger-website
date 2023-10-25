/*
  Warnings:

  - You are about to drop the column `accountProivder` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountProivder",
ADD COLUMN     "accountProvider" "AccountProvider";
