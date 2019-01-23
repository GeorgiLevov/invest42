import {MigrationInterface, QueryRunner} from "typeorm";

export class CompanyEntityUpdate1548237451760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `fullname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('ADMIN', 'MANAGER') NOT NULL, `avatar` varchar(255) NOT NULL, `status` enum ('ARCHIVED', 'ACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `prices` (`id` int NOT NULL AUTO_INCREMENT, `opendate` datetime NOT NULL, `startprice` int NOT NULL, `endprice` int NOT NULL, `highprice` int NOT NULL, `lowprice` int NOT NULL, `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `news` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `datePublished` datetime NOT NULL, `author` varchar(255) NOT NULL, `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `abbr` varchar(255) NOT NULL DEFAULT '', `icon` varchar(255) NOT NULL DEFAULT '', `ceo` varchar(255) NOT NULL DEFAULT '', `address` varchar(255) NOT NULL DEFAULT '', `startdate` datetime NOT NULL, `status` enum ('ACTIVE', 'ARCHIVED') NOT NULL, `industry` enum ('Technology', 'Pharmaceutical', 'Healthcare', 'Manufacturing', 'Retail', 'Goods & Services', 'Banks and Finantial Institutions') NOT NULL, UNIQUE INDEX `IDX_3dacbb3eb4f095e29372ff8e13` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `opendate` datetime NOT NULL, `closedate` datetime NULL, `buyprice` int NOT NULL, `sellprice` int NOT NULL, `units` int NOT NULL, `status` enum ('OPEN', 'CLOSED', 'SOLD') NOT NULL, `clientId` int NULL, `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `fullname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `dateOfCreation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `age` int NOT NULL, `address` varchar(255) NOT NULL, `availableBalance` int NOT NULL, `icon` varchar(255) NOT NULL, `status` enum ('ACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE', `managerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients_watchlist_companies` (`clientsId` int NOT NULL, `companiesId` int NOT NULL, PRIMARY KEY (`clientsId`, `companiesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `news` ADD CONSTRAINT `FK_f13064388bb58da68952d18b65b` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b298c69fe5af01a26569338853f` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` ADD CONSTRAINT `FK_c414326bf7a04717044f909db29` FOREIGN KEY (`clientsId`) REFERENCES `clients`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` ADD CONSTRAINT `FK_a082d2239f4200970c2f3d0d29b` FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` DROP FOREIGN KEY `FK_a082d2239f4200970c2f3d0d29b`");
        await queryRunner.query("ALTER TABLE `clients_watchlist_companies` DROP FOREIGN KEY `FK_c414326bf7a04717044f909db29`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b298c69fe5af01a26569338853f`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_1457f286d91f271313fded23e53`");
        await queryRunner.query("ALTER TABLE `news` DROP FOREIGN KEY `FK_f13064388bb58da68952d18b65b`");
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("DROP TABLE `clients_watchlist_companies`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP TABLE `orders`");
        await queryRunner.query("DROP INDEX `IDX_3dacbb3eb4f095e29372ff8e13` ON `companies`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP TABLE `news`");
        await queryRunner.query("DROP TABLE `prices`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
