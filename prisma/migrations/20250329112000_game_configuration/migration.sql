-- AlterTable
ALTER TABLE "users" ALTER COLUMN "font" SET DEFAULT 'font-sans';

-- CreateTable
CREATE TABLE "game" (
    "name" TEXT NOT NULL DEFAULT 'Starboard',
    "subtitle" TEXT NOT NULL DEFAULT 'Star Harder',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "shopEnabled" BOOLEAN NOT NULL DEFAULT true,
    "tasksEnabled" BOOLEAN NOT NULL DEFAULT true,
    "tamperEnabled" BOOLEAN NOT NULL DEFAULT true,
    "webhookEnabled" BOOLEAN NOT NULL DEFAULT true,
    "scoreboardEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "game_pkey" PRIMARY KEY ("name")
);
