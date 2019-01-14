import {MigrationInterface, QueryRunner} from "typeorm";

export class EditSchema21547416452578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients` CHANGE `fullName` `fullname` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `fullname` `fullName` varchar(255) NOT NULL");
    }

}
