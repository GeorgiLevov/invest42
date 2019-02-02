import { Component, OnInit, Input, OnChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnChanges {

  clickedItem: 'dashboard';
  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
  @ViewChildren('sidenav') sidenav: MatSidenav;

  @Input() managing;
  @Input() navMode;
  @Input() navMenu;

  open() {
    this.sidenav.open();
  }

  close() {
    this.sidenav.close();
  }

  onEdit() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }
  onClick(item: 'dashboard') {
    this.clickedItem = item;
  }

}
