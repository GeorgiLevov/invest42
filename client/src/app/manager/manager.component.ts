import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  // public navMenu = [
  //   {
  //     text: 'Market',
  //     route: '/manager/market',
  //     path: 'market',
  //     isActive: false,
  //   },
  //   {
  //     text: 'Positions',
  //     route: '/manager/positions',
  //     path: 'positions',
  //     isActive: false,
  //   },
  //   {
  //     text: 'Clients',
  //     route: '/manager/clients',
  //     path: 'clients',
  //     isActive: false,
  //   }
  // ];

  public navMenu = [
    {
      name: 'Home - Manager',
      route: '/manager/home',
      path: 'home',
      isActive: false,
    },
    {
      name: 'Users - Manager',
      route: '/manager/users',
      path: 'users',
      isActive: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.route.parent.url.subscribe(() => {
      let activePath;

      const urlSubject = this.route.firstChild.url.subscribe((value) => {
        activePath = value[0].path;
      });

      this.navMenu.forEach((menu) => {
        menu.path === activePath ? menu.isActive = true : menu.isActive = false;
      });

      urlSubject.unsubscribe();
    });

  }

}
