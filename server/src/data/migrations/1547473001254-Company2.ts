import {MigrationInterface, QueryRunner} from "typeorm";

export class Company21547473001254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `companies` ADD `status` enum ('ACTIVE', 'ARCHIVED') NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `companies` DROP COLUMN `status`");
    }

}
