import { CompanyPortfolioService } from './company-portfolio.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tile } from '../../models/interfaces/tile.interface';
import { MarketService } from '../market/market.serivice';

@Component({
  selector: 'app-company-portfolio',
  templateUrl: './company-portfolio.component.html',
  styleUrls: ['./company-portfolio.component.css']
})

//  companyInfo()

export class CompanyPortfolioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private portfolioService: CompanyPortfolioService) { }
  private params  = this.route.snapshot.params;
  public companyObject;
  public companyNews;
  public step = 0;
  ngOnInit() {
    this.showProfile(this.params.id);
   }

  showProfile(companyId) {
    this.portfolioService.getCompanies(companyId)
    .subscribe(
      (company: any) => {
        this.companyObject = company;
        this.companyNews = company.__news__.slice(0, 3);
      },
      error => console.log(error)
    );

  }

  // News service
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
