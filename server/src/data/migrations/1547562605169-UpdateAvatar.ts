import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAvatar1547562605169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NOT NULL DEFAULT ''");
    }

}
