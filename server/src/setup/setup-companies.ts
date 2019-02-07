import { createConnection } from 'typeorm';
import { Company } from './../data/entities/company.entity';
import { Industry } from '../models/enums/industry.enum';

createConnection().then(async (conn) => {

      // Setup admins
      const companyRepository = conn.getRepository<Company>(Company);

      try {

            const company1 = new Company();
            company1.name = 'Prison-Escobar';
            company1.abbr = 'PBR';
            company1.icon = 'images\\companies\\escobar.png';
            company1.ceo = 'Hristo Mirchev';
            company1.address = 'ul. "61-va" nom. 10, g.k. Vrajdebna, Sofia';
            company1.industry = Industry.health;
            // market1.prices = Promise.resolve([]);
            // market1.orders = Promise.resolve([]);
            // market1.clients = Promise.resolve([]);
            company1.startdate = new Date(2018, 12, 31, 12, 0);

            await companyRepository.save(company1);

            const company2 = new Company();
            company2.name = 'Tick-42';
            company2.industry = Industry.tech;
            company2.abbr = 'T42';
            company2.address = 'ul. "Doctor Atanas Moskov" nom. 40, 1715 g.k. Mladost 4, Sofia';
            company2.ceo = 'Leslie Spiro';
            company2.icon = 'images\\companies\\tick42.png';
            // market2.prices = Promise.resolve([]);
            // market2.orders = Promise.resolve([]);
            // market2.clients = Promise.resolve([]);
            company2.startdate = new Date(1942, 1, 1, 8, 0);
            await companyRepository.save(company2);

            const company3 = new Company();
            company3.name = 'Tesla';
            company3.abbr = 'TSA';
            company3.icon = 'images\\companies\\tesla.png';
            company3.ceo = 'Elon Musk';
            company3.address = '500 Deer Creek Road Palo Alto, CA 94304 United States';
            company3.industry = Industry.tech;
            // market3.prices = Promise.resolve([]);
            // market3.orders = Promise.resolve([]);
            // market3.clients = Promise.resolve([]);
            company3.startdate = new Date(2003, 7, 1, 0, 0);

            await companyRepository.save(company3);

            const company4 = new Company();
            company4.name = 'Amazon';
            company4.industry = Industry.tech;
            company4.abbr = 'AZN';
            company4.address = '410 Terry Ave. North Seattle, WA';
            company4.ceo = 'Jeff Bezos';
            company4.icon = 'images\\companies\\amazon.png';
            // market4.prices = Promise.resolve([]);
            // market4.orders = Promise.resolve([]);
            // market4.clients = Promise.resolve([]);
            company4.startdate = new Date(1994, 7, 5, 0, 0);

            await companyRepository.save(company4);

            const company5 = new Company();
            company5.name = 'Telerik Academy';
            company5.abbr = 'TKA';
            company5.icon = 'images\\companies\\telerik.png';
            company5.ceo = 'Vasil Terziev and Svetozar Georgiev';
            company5.address = 'Aleksandar Malinov Boulevard 31, 1729 g.k. Mladost 1A, Sofia';
            company5.industry = Industry.tech;
            // market5.prices = Promise.resolve([]);
            // market5.orders = Promise.resolve([]);
            // market5.clients = Promise.resolve([]);
            company5.startdate = new Date(2002, 1, 1, 0, 0);

            await companyRepository.save(company5);

            const company6 = new Company();
            company6.name = 'Google';
            company6.industry = Industry.tech;
            company6.abbr = 'GOOG';
            company6.address = '600 Amphitheatre Parkway, Mountain View, California, U.S.';
            company6.ceo = 'Pichai Sundararajan';
            company6.icon = 'images\\companies\\google.png';
            // market6.prices = Promise.resolve([]);
            // market6.orders = Promise.resolve([]);
            // market6.clients = Promise.resolve([]);
            company6.startdate = new Date(1998, 9, 4, 8, 0);

            await companyRepository.save(company6);

            const company7 = new Company();
            company7.name = 'Facebook';
            company7.industry = Industry.tech;
            company7.abbr = 'FCB';
            company7.address = '1601 Willow Road Menlo Park, California, U.S.';
            company7.ceo = 'Mark Zuckerberg';
            company7.icon = 'images\\companies\\facebook.png';
            // market7.prices = Promise.resolve([]);
            // market7.orders = Promise.resolve([]);
            // market7.clients = Promise.resolve([]);
            company7.startdate = new Date(2004, 2, 4, 8, 0);

            await companyRepository.save(company7);

            const company8 = new Company();
            company8.name = 'Microsoft';
            company8.industry = Industry.tech;
            company8.abbr = 'MRS';
            company8.address = 'One Microsoft Way, Redmond, Washington, U.S.';
            company8.ceo = 'Satya Nadella';
            company8.icon = 'images\\companies\\microsoft.png';
            // market8.prices = Promise.resolve([]);
            // market8.orders = Promise.resolve([]);
            // market8.clients = Promise.resolve([]);
            company8.startdate = new Date(1975, 4, 4, 0, 0);

            await companyRepository.save(company8);

            const company9 = new Company();
            company9.name = 'Apple';
            company9.industry = Industry.tech;
            company9.abbr = 'APPL';
            company9.address = '1 Apple Park Way, Cupertino, California, U.S.';
            company9.ceo = 'Tim Cook';
            company9.icon = 'images\\companies\\apple.png';
            // market9.prices = Promise.resolve([]);
            // market9.orders = Promise.resolve([]);
            // market9.clients = Promise.resolve([]);
            company9.startdate = new Date(1976, 4, 1, 8, 0);

            await companyRepository.save(company9);

            const company10 = new Company();
            company10.name = 'HSBC';
            company10.industry = Industry.finance;
            company10.abbr = 'HSBC';
            company10.address = '8 Canada Square, Canary Wharf, London, UK';
            company10.ceo = 'Mark Tucker (Group Chairman)';
            company10.icon = 'images\\companies\\hsbc.png';
            // market9.prices = Promise.resolve([]);
            // market9.orders = Promise.resolve([]);
            // market9.clients = Promise.resolve([]);
            company10.startdate = new Date(1865, 3, 3, 8, 0);

            await companyRepository.save(company10);

            // tslint:disable-next-line:no-console
            console.log(`Test companies added to DB`);
      } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
            // tslint:disable-next-line:no-console
            console.warn('Skipped adding companies to DB...');
      }
      conn.close();
});