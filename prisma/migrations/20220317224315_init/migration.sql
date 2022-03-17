/*
  Warnings:

  - You are about to drop the column `owner_id` on the `collaborators` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `columns` table. All the data in the column will be lost.
  - Added the required column `board_id` to the `collaborators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `board_id` to the `columns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collaborators` DROP FOREIGN KEY `collaborators_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `columns` DROP FOREIGN KEY `columns_user_id_fkey`;

-- AlterTable
ALTER TABLE `collaborators` DROP COLUMN `owner_id`,
    ADD COLUMN `board_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `columns` DROP COLUMN `user_id`,
    ADD COLUMN `board_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Board` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collaborators` ADD CONSTRAINT `collaborators_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `columns` ADD CONSTRAINT `columns_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
