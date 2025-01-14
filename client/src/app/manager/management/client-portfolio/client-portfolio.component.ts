import { PriceData } from './../../../shared/models/interfaces/prices.model';
import { Orders } from './../../../shared/models/interfaces/orders.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ManagerService } from '../../services/manager.service';
import { ClientModel } from '../../../shared/models/interfaces/client.model';
import { UpdateBalanceComponent } from '../../manager-modals/update-balance/update-balance.component';
import { UpdateClientInfoComponent } from '../../manager-modals/update-client/update-client.component';
import { order } from '@amcharts/amcharts4/.internal/core/utils/Number';

@Component({
  selector: 'app-client-portfolio',
  templateUrl: './client-portfolio.component.html',
  styleUrls: ['./client-portfolio.component.css']
})
export class ClientPortfolioComponent implements OnInit {

  private params = this.route.snapshot.params;
  public client: ClientModel;
  public clientOrders: Orders[];
  public profitLoss: number;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.showClientPortfolio(this.router.url.split('/')[3]);
  }

  showClientPortfolio(clientId) {
    this.managerService.getClientPortfolio(clientId)
      .subscribe(
        (clientData: any) => {
          this.client = clientData as ClientModel;
          const orders = clientData.orders as Orders[];
          this.clientOrders = orders.filter((clientOrder) => clientOrder.status === 'OPEN');
          this.profitLoss = this.clientProfitLoss(this.clientOrders);
        },
        error => console.log(error)
      );
  }

  clientProfitLoss(clientOrders) {
    return clientOrders.reduce((reducer, clientOrder: Orders) => {
      return reducer + ((clientOrder.sellprice - clientOrder.buyprice) * clientOrder.units);
    }, 0);
  }

  deposit() {
    const dialogRef = this.dialog.open(UpdateBalanceComponent, {
      data: { id: this.client.id, availableBalance: this.client.availableBalance, isDeposit: true }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => this.showClientPortfolio(this.client.id), 50);
      }
    });
  }

  withdraw() {
    const dialogRef = this.dialog.open(UpdateBalanceComponent, {
      data: { id: this.client.id, availableBalance: this.client.availableBalance, isDeposit: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => this.showClientPortfolio(this.client.id), 50);
      }
    });
  }

  editAccount() {
    // should be impl
    const dialogRef = this.dialog.open(UpdateClientInfoComponent, {
      data: {
        id: this.client.id,
        email: this.client.email,
        address: this.client.address
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.showClientPortfolio(this.client.id);
      }
    });
  }

}
