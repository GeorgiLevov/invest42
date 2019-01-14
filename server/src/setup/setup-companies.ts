import { Industry } from './../models/enums/industry.enum';
import { createConnection } from 'typeorm';
import { Company } from './../data/entities/company.entity';

createConnection().then(async (conn) => {

    // Setup admins
    const companyRepository = conn.getRepository<Company>(Company);

    try {

    const company1 = new Company();
    company1.name = 'Tesla';
    company1.abbr = 'TLA';
    company1.icon = '__MISSING__';
    company1.ceo = 'CEO of Tesla';
    company1.address = 'United States Generic Address';
    company1.industry = Industry.manufacturing;
    // market2.prices = Promise.resolve([]);
    // market2.orders = Promise.resolve([]);
    // market2.clients = Promise.resolve([]);
    company1.startdate = new Date(1998, 6, 6, 12, 0);

    await companyRepository.save(company1);

    const company2 = new Company();
    company2.name = 'Amazon';
    company2.industry = Industry.retail;
    company2.abbr = 'AZN';
    company2.address = 'United States Generic Address';
    company2.ceo = 'CEO of Amazon';
    company2.icon = '__MISSING__';
    // market2.prices = Promise.resolve([]);
    // market2.orders = Promise.resolve([]);
    // market2.clients = Promise.resolve([]);
    company2.startdate = new Date(2000, 0, 0, 8, 0);

    await companyRepository.save(company1);
    await companyRepository.save(company2);
    // await companyRepository.save(company3);
    // await companyRepository.save(company4);
    // await companyRepository.save(company5);
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