/*
  Warnings:

  - You are about to drop the `Starboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Starboard";

-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT 'Starboard',
    "subtitle" TEXT NOT NULL DEFAULT 'Star Harder',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "showInstagram" BOOLEAN NOT NULL DEFAULT true,
    "shopEnabled" BOOLEAN NOT NULL DEFAULT true,
    "tasksEnabled" BOOLEAN NOT NULL DEFAULT true,
    "scoreboardEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);
