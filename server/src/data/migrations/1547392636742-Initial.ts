import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1547392636742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `clients_watchlist_companies` (`clientsId` varchar(255) NOT NULL, `companiesId` varchar(255) NOT NULL, PRIMARY KEY (`clientsId`, `companiesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` ADD CONSTRAINT `FK_c414326bf7a04717044f909db29` FOREIGN KEY (`clientsId`) REFERENCES `clients`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` ADD CONSTRAINT `FK_a082d2239f4200970c2f3d0d29b` FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` DROP FOREIGN KEY `FK_a082d2239f4200970c2f3d0d29b`");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` DROP FOREIGN KEY `FK_c414326bf7a04717044f909db29`");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("DROP TABLE `clients_watchlist_companies`");
    }

}
