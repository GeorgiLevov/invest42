import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1547392533219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `news` (`id` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `datePublished` datetime NOT NULL, `author` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `fullname` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('MANAGER', 'ADMIN') NOT NULL, `avatar` varchar(255) NOT NULL, `newsId` varchar(255) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `prices` (`id` varchar(255) NOT NULL, `opendate` datetime NOT NULL, `startprice` int NOT NULL, `endprice` int NOT NULL, `highprice` int NOT NULL, `lowprice` int NOT NULL, `companyId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `abbr` varchar(255) NOT NULL DEFAULT '', `icon` varchar(255) NOT NULL DEFAULT '', `ceo` varchar(255) NOT NULL DEFAULT '', `address` varchar(255) NOT NULL DEFAULT '', `closedate` datetime NOT NULL, `industry` enum ('RETAIL', 'PHARMACEUTICAL', 'HEALTHCARE', 'MANUFACTURING', 'TECHNOLOGY', 'SERVICES') NOT NULL, UNIQUE INDEX `IDX_3dacbb3eb4f095e29372ff8e13` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orders` (`id` varchar(255) NOT NULL, `opendate` datetime NOT NULL, `closedate` datetime NULL, `buyprice` int NOT NULL, `sellprice` int NOT NULL, `units` int NOT NULL, `status` enum ('OPENED', 'CLOSED') NOT NULL, `clientId` varchar(255) NULL, `companyId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` varchar(255) NOT NULL, `fullName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `availableBalance` int NOT NULL, `icon` varchar(255) NOT NULL, `managerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3fe3e47f73d813db2dc64b97883` FOREIGN KEY (`newsId`) REFERENCES `news`(`id`)");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b298c69fe5af01a26569338853f` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b298c69fe5af01a26569338853f`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_1457f286d91f271313fded23e53`");
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3fe3e47f73d813db2dc64b97883`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP TABLE `orders`");
        await queryRunner.query("DROP INDEX `IDX_3dacbb3eb4f095e29372ff8e13` ON `companies`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP TABLE `prices`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `news`");
    }

}
