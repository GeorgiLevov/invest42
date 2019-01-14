import {MigrationInterface, QueryRunner} from "typeorm";

export class EditSchema1547408089378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3fe3e47f73d813db2dc64b97883`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `newsId`");
        await queryRunner.query("ALTER TABLE `news` ADD `companyId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `news` ADD CONSTRAINT `FK_f13064388bb58da68952d18b65b` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `news` DROP FOREIGN KEY `FK_f13064388bb58da68952d18b65b`");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `news` DROP COLUMN `companyId`");
        await queryRunner.query("ALTER TABLE `users` ADD `newsId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3fe3e47f73d813db2dc64b97883` FOREIGN KEY (`newsId`) REFERENCES `news`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
