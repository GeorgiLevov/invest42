import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public navMenu = [
    {
      text: 'Market',
      route: '/manager/market',
      path: 'market',
      isActive: false,
    },
    {
      text: 'Positions',
      route: '/manager/positions',
      path: 'positions',
      isActive: false,
    },
    {
      text: 'Clients',
      route: '/manager/clients',
      path: 'clients',
      isActive: false,
    }
  ];

  constructor() { }

  ngOnInit() {
  }




}
