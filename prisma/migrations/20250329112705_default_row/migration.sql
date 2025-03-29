/*
  Warnings:

  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "game";

-- CreateTable
CREATE TABLE "Starboard" (
    "name" TEXT NOT NULL DEFAULT 'Starboard',
    "subtitle" TEXT NOT NULL DEFAULT 'Star Harder',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "shopEnabled" BOOLEAN NOT NULL DEFAULT true,
    "tasksEnabled" BOOLEAN NOT NULL DEFAULT true,
    "tamperEnabled" BOOLEAN NOT NULL DEFAULT true,
    "webhookEnabled" BOOLEAN NOT NULL DEFAULT true,
    "scoreboardEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Starboard_pkey" PRIMARY KEY ("name")
);
