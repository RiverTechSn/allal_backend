/*
  Warnings:

  - You are about to drop the column `customerId` on the `otp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `otp_customerId_fkey`;

-- DropIndex
DROP INDEX `otp_customerId_fkey` ON `otp`;

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `customerId`,
    ADD COLUMN `loginId` INTEGER NULL,
    ADD COLUMN `to` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `login`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
