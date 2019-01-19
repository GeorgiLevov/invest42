import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MzSidenavModule } from 'ngx-materialize';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnChanges {

  @Input() navMenu;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

}
