-- CreateTable
CREATE TABLE `columns_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `board_id` INTEGER NOT NULL,
    `column_id` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `columns_order` ADD CONSTRAINT `columns_order_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `columns_order` ADD CONSTRAINT `columns_order_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `columns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
