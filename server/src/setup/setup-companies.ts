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
      company1.icon = 'images\\escobar.png';
      company1.ceo = 'CEO of Prison Escobar';
      company1.address = 'Prison Escobar Address';
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
      company2.address = 'Tick-42 Address';
      company2.ceo = 'CEO of Tick-42';
      company2.icon = 'images\\tick-42.jpg';
      // market2.prices = Promise.resolve([]);
      // market2.orders = Promise.resolve([]);
      // market2.clients = Promise.resolve([]);
      company2.startdate = new Date(2006, 0, 0, 8, 0);

      await companyRepository.save(company2);

      const company3 = new Company();
      company3.name = 'Tesla';
      company3.abbr = 'TSA';
      company3.icon = 'images\\tesla.png';
      company3.ceo = 'CEO of Tesla Escobar';
      company3.address = 'Tesla Address';
      company3.industry = Industry.tech;
      // market3.prices = Promise.resolve([]);
      // market3.orders = Promise.resolve([]);
      // market3.clients = Promise.resolve([]);
      company3.startdate = new Date(1997, 12, 31, 12, 0);

      await companyRepository.save(company3);

      const company4 = new Company();
      company4.name = 'Amazon';
      company4.industry = Industry.tech;
      company4.abbr = 'AZN';
      company4.address = 'Amazon Address';
      company4.ceo = 'CEO of Amazon';
      company4.icon = 'images\\amazon.png';
      // market4.prices = Promise.resolve([]);
      // market4.orders = Promise.resolve([]);
      // market4.clients = Promise.resolve([]);
      company4.startdate = new Date(1994, 0, 0, 8, 0);

      await companyRepository.save(company4);

      const company5 = new Company();
      company5.name = 'Telerik Academy';
      company5.abbr = 'TKA';
      company5.icon = 'images\\telerik.png';
      company5.ceo = 'CEO of Telerik';
      company5.address = 'Telerik Address';
      company5.industry = Industry.tech;
      // market5.prices = Promise.resolve([]);
      // market5.orders = Promise.resolve([]);
      // market5.clients = Promise.resolve([]);
      company5.startdate = new Date(1997, 12, 31, 12, 0);

      await companyRepository.save(company5);

      const company6 = new Company();
      company6.name = 'Google';
      company6.industry = Industry.tech;
      company6.abbr = 'GOOG';
      company6.address = 'Google Address';
      company6.ceo = 'CEO of Google';
      company6.icon = 'images\\google.png';
      // market6.prices = Promise.resolve([]);
      // market6.orders = Promise.resolve([]);
      // market6.clients = Promise.resolve([]);
      company6.startdate = new Date(1991, 1, 0, 8, 0);

      await companyRepository.save(company6);

      const company7 = new Company();
      company7.name = 'Facebook';
      company7.industry = Industry.tech;
      company7.abbr = 'FCB';
      company7.address = 'Facebook Address';
      company7.ceo = 'CEO of Facebook';
      company7.icon = 'images\\facebook.png';
      // market7.prices = Promise.resolve([]);
      // market7.orders = Promise.resolve([]);
      // market7.clients = Promise.resolve([]);
      company7.startdate = new Date(2006, 0, 12, 8, 0);

      await companyRepository.save(company7);

      const company8 = new Company();
      company8.name = 'Microsoft';
      company8.industry = Industry.tech;
      company8.abbr = 'MRS';
      company8.address = 'Microsoft Address';
      company8.ceo = 'CEO of Microsoft';
      company8.icon = 'images\\amazon.png';
      // market8.prices = Promise.resolve([]);
      // market8.orders = Promise.resolve([]);
      // market8.clients = Promise.resolve([]);
      company8.startdate = new Date(1955, 0, 0, 8, 0);

      await companyRepository.save(company8);

      const company9 = new Company();
      company9.name = 'Apple';
      company9.industry = Industry.tech;
      company9.abbr = 'APPL';
      company9.address = 'Apple Address';
      company9.ceo = 'CEO of Apple';
      company9.icon = 'images\\amazon.png';
      // market9.prices = Promise.resolve([]);
      // market9.orders = Promise.resolve([]);
      // market9.clients = Promise.resolve([]);
      company9.startdate = new Date(1974, 0, 0, 8, 0);

      await companyRepository.save(company9);

      const company10 = new Company();
      company10.name = 'HSBC';
      company10.industry = Industry.finance;
      company10.abbr = 'HSBC';
      company10.address = 'HSBC Address';
      company10.ceo = 'CEO of HSBC';
      company10.icon = 'images\\hsbc.png';
      // market9.prices = Promise.resolve([]);
      // market9.orders = Promise.resolve([]);
      // market9.clients = Promise.resolve([]);
      company10.startdate = new Date(1911, 0, 1, 8, 0);

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