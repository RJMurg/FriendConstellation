/*
  Warnings:

  - You are about to drop the column `tamperEnabled` on the `Starboard` table. All the data in the column will be lost.
  - You are about to drop the column `webhookEnabled` on the `Starboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Starboard" DROP COLUMN "tamperEnabled",
DROP COLUMN "webhookEnabled",
ADD COLUMN     "showInstagram" BOOLEAN NOT NULL DEFAULT true;
