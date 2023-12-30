/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "team_user_id_key" ON "team"("user_id");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
