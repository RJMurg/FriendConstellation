-- AlterTable
ALTER TABLE "users" ADD COLUMN     "animation" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "card" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "font" VARCHAR(100) NOT NULL DEFAULT 'sans',
ADD COLUMN     "hat" VARCHAR(100) NOT NULL DEFAULT '',
ALTER COLUMN "name" SET DEFAULT 'Missingno';

-- CreateTable
CREATE TABLE "shop" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "cost" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("id")
);
