-- AlterTable
ALTER TABLE "webhooks" ADD COLUMN     "showTampers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showTasks" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "tamperEvidentMessages" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3),

    CONSTRAINT "tamperEvidentMessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tamperEvidentMessages_uuid_key" ON "tamperEvidentMessages"("uuid");
