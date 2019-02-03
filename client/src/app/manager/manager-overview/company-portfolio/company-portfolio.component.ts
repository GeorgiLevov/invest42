import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);
import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { CompanyPortfolioService } from './company-portfolio.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceData } from '../../../shared/models/interfaces/prices.model';

@Component({
  selector: 'app-company-portfolio',
  templateUrl: './company-portfolio.component.html',
  styleUrls: ['./company-portfolio.component.css']
})

export class CompanyPortfolioComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4charts.XYChart;

  private params = this.route.snapshot.params;

  public companyObject;
  public companyNews;
  public step = 0;

  // test
  prices: PriceData[];

  constructor(
    private route: ActivatedRoute,
    private portfolioService: CompanyPortfolioService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.showProfile(this.params.id);
    // this.getCompanyPrices(this.params.id);
  }

  ngAfterViewInit() {
    this.chartData(60);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  chartData(limit) {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 20;
      chart.dateFormatter.inputDateFormat = 'yyyy-mm-dd hh:mm:ss';

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      const series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'close';
      series.dataFields.openValueY = 'open';
      series.dataFields.lowValueY = 'low';
      series.dataFields.highValueY = 'high';
      series.simplifiedProcessing = true;
      series.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      // a separate series for scrollbar
      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = 'date';
      lineSeries.dataFields.valueY = 'close';
      // need to set on default state, as initially series is 'show'
      lineSeries.defaultState.properties.visible = false;

      // hide from legend too (in case there is one)
      lineSeries.hiddenInLegend = true;
      lineSeries.fillOpacity = 0.5;
      lineSeries.strokeOpacity = 0.5;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(lineSeries);
      chart.scrollbarX = scrollbarX;

      this.portfolioService.getCompanyPrices(this.params.id, limit)
        .subscribe((prices) => {
          // console.log(prices);
          this.prices = prices as PriceData[];
          chart.data = prices.reverse();
        },
          error => console.log(error));

      this.chart = chart;
    });
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
