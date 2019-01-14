// import { Company } from '../../../data/entities/company.entity';
// import { CompanyDTO } from './../../../models/company.dto';
// import { Industry } from '../../../data/entities/industry.entity';
// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { Repository } from 'typeorm';

// @Injectable()
// export class CompaniesService {
//     constructor(
//         @InjectRepository(Company)
//         private readonly companyRepository: Repository<Company>,
//         @InjectRepository(Industry)
//         private readonly industryRepository: Repository<Industry>,
//     ) { }

//     async createCompany(companyDTO: CompanyDTO) {
//         const companyFound = await this.companyRepository.findOne({ where: { name: companyDTO.name } });

//         if (companyFound) {
//             throw new HttpException('Company already exists!', HttpStatus.BAD_REQUEST);
//         }

//         const industry = await this.industryRepository.findOne({ where: { id: companyDTO.industryId } });
//         if (!industry) {
//             throw new HttpException('Industry not found!', HttpStatus.NOT_FOUND);
//         }

//         const company = new Company();
//         company.name = companyDTO.name;
//         company.abbr = companyDTO.abbr;
//         company.icon = companyDTO.icon;
//         company.ceo = companyDTO.ceo;
//         company.address = companyDTO.address;
//         // company.industry = industry;
//         company.closedate = new Date();

//         await this.companyRepository.create(company);

//         return await this.companyRepository.save(company);
//     }

//     async updateCompany(id: string, companyDTO: Partial<CompanyDTO>) {
//         const companyFound = await this.companyRepository.findOne({ where: { id } });

//         if (!companyFound) {
//             throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);
//         }

//         companyFound.name = companyDTO.name;
//         companyFound.abbr = companyDTO.abbr;
//         companyFound.icon = companyDTO.icon;
//         companyFound.ceo = companyDTO.ceo;
//         companyFound.address = companyDTO.address;

//         if (companyDTO.industryId) {
//             const industry = await this.industryRepository.findOne({ where: { id: companyDTO.industryId } });
//             if (!industry) {
//                 throw new HttpException('Industry not found!', HttpStatus.NOT_FOUND);
//             }
//             // companyFound.industry = industry;
//         }

//         await this.companyRepository.save(companyFound);

//         return await this.companyRepository.findOne({
//             where: { id },
//         });
//     }

//     async getCompaniesByIndustry(id: string) {
//         const industry = await this.industryRepository.findOne({ where: { id } });

//         if (!industry) {
//             throw new HttpException('Industry not found!', HttpStatus.NOT_FOUND);
//         }

//         return await this.companyRepository.find({ where: { industry } });
//     }

//     async getCompanyTimesListed(id: string) {
//         const companyFound = await this.companyRepository.findOne({ where: { id } });

//         if (!companyFound) {
//             throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);
//         }

//         const companies = [1, 2, 3];

//         return companies.length;
//     }
// }