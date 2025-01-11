-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cosmetic_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cosmetic_id" DROP NOT NULL,
ALTER COLUMN "cosmetic_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cosmetic_id_fkey" FOREIGN KEY ("cosmetic_id") REFERENCES "shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
