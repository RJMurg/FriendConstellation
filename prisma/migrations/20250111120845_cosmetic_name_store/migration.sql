-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cosmetic_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cosmetic_id_fkey" FOREIGN KEY ("cosmetic_id") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
