import {MigrationInterface, QueryRunner} from "typeorm";

export class Company31547473038379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

}
