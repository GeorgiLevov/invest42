import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Role } from '../data/entities/role.entity';
import { Status } from '../data/entities/status.entity';
import { Company } from '../data/entities/company.entity';
import { Industry } from '../data/entities/industry.entity';

// tslint:disable:no-console

createConnection().then(async (conn) => {

  // Setup user roles
  const roleRepo = conn.getRepository<Role>(Role);

  try {
    const roleUser = new Role();
    roleUser.rolename = 'admin';
    await roleRepo.save(roleUser);

    const roleAdmin = new Role();
    roleAdmin.rolename = 'manager';
    await roleRepo.save(roleAdmin);

    const roleBanned = new Role();
    roleBanned.rolename = 'client';
    await roleRepo.save(roleBanned);

    const roleClosed = new Role();
    roleClosed.rolename = 'closed';
    await roleRepo.save(roleClosed);

    console.log(`User roles written successfully.`);
  } catch (e) {
    console.warn('Skipping user roles...');
  }

  // Setup orders status
  const statusRepo = conn.getRepository<Status>(Status);

  try {
    const statusOpened = new Status();
    statusOpened.statusname = 'opened';
    await statusRepo.save(statusOpened);

    const statusClosed = new Status();
    statusClosed.statusname = 'closed';
    await statusRepo.save(statusClosed);

    console.log(`Status table written successfully.`);
  } catch (e) {
    console.warn('Skipping orders status...');
  }

  // Setup mock-up industries

  const industryRepo = conn.getRepository<Industry>(Industry);
  try {
    const industry1 = new Industry();
    industry1.name = 'Test Industry #1';
    await industryRepo.save(industry1);

    const industry2 = new Industry();
    industry2.name = 'Test Industry #2';
    await industryRepo.save(industry2);
    console.log(`Test industries written`);
  } catch (e) {
    console.warn('Skipping test industries...');
  }

  // Setup mock-up markets
  const companyRepo = conn.getRepository<Company>(Company);

  try {
    const industries = await industryRepo.find({});
    const firstIndustry = industries[0];

    const company1 = new Company();
    company1.name = 'Test Market #1';
    company1.industry = firstIndustry;
    company1.abbr = 'AAA';
    company1.address = 'Test Address #1';
    company1.ceo = 'Test CEO #1';
    company1.icon = '__MISSING__';
    company1.closedate = new Date(2000, 0, 0, 12, 0);
    // market1.watchlists = Promise.resolve([]);
    // market1.orders = Promise.resolve([]);
    // market1.stocks = Promise.resolve([]);
    await companyRepo.save(company1);

    const company2 = new Company();
    company2.name = 'Test Market #2';
    company2.industry = firstIndustry;
    company2.abbr = 'DD';
    company2.address = 'Test Address #2';
    company2.ceo = 'Test CEO #2';
    company2.icon = '__MISSING__';
    company2.closedate = new Date(2000, 0, 0, 8, 0);
    // market2.watchlists = Promise.resolve([]);
    // market2.orders = Promise.resolve([]);
    // market2.stocks = Promise.resolve([]);
    await companyRepo.save(company2);
    console.log(`Test markets written`);
  } catch (e) {
    console.log(e);
    console.warn('Skipping test markets...');
  }

  conn.close();
});