/*
  Warnings:

  - Added the required column `owner_id` to the `collaborators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collaborators` ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `collaborators_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
