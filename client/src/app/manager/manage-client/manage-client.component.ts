import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css']
})
export class ManageClientComponent implements OnInit {

  public managing = true;

  public navMode = 'Management Mode';
  public navMenu = [
    {
      text: 'Portfolio',
      route: './portfolio',
      path: 'portfolio',
      isActive: true,
    },
    {
      text: 'Active Positions',
      route: './positions',
      path: 'positions',
      isActive: true,
    },
    {
      text: 'Market',
      route: './market',
      path: 'market',
      isActive: true,
    },
    {
      text: 'Watchlist',
      route: './watchlist',
      path: 'watchlist',
      isActive: true,
    },
    {
      text: 'History',
      route: './history',
      path: 'history',
      isActive: true,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
