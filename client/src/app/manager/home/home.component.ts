import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly apiUrl = 'http://localhost:5500';


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

  }


  getMarket() {
    console.log('te');
    const obj = this.http.get(`${this.apiUrl}/view/market`);
    obj.subscribe((data) => {
      console.log(data);
    },
      (err) => {
        console.log(err);
      });
  }

}
