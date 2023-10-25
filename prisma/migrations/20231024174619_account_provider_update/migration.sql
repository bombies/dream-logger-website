-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountProivder" "AccountProvider";
