import {MigrationInterface, QueryRunner} from "typeorm";

export class Update1547464627179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `status` enum ('ARCHIVED', 'ACTIVE') NOT NULL DEFAULT 'ACTIVE'");
        await queryRunner.query("ALTER TABLE `clients` ADD `status` enum ('ACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `clients` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `status`");
    }

}
