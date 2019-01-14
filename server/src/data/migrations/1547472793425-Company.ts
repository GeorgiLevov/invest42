import {MigrationInterface, QueryRunner} from "typeorm";

export class Company1547472793425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `startdate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `startdate` `closedate` datetime NOT NULL");
    }

}
