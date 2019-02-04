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
      isActive: false,
    },
    {
      text: 'Active Positions',
      route: './positions',
      path: 'positions',
      isActive: false,
    },
    {
      text: 'Market',
      route: './market',
      path: 'market',
      isActive: false,
    },
    {
      text: 'Watchlist',
      route: './watchlist',
      path: 'watchlist',
      isActive: false,
    },
    {
      text: 'History',
      route: './history',
      path: 'history',
      isActive: false,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
