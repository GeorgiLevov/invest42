import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ManagerService } from '../../services/manager.service';
import { ClientModel } from '../../../shared/models/interfaces/client.model';
import { UpdateBalanceComponent } from '../../manager-modals/update-balance/update-balance.component';
import { UpdateClientInfoComponent } from '../../manager-modals/update-client/update-client.component';

@Component({
  selector: 'app-client-portfolio',
  templateUrl: './client-portfolio.component.html',
  styleUrls: ['./client-portfolio.component.css']
})
export class ClientPortfolioComponent implements OnInit {

  client: ClientModel;
  private params = this.route.snapshot.params;

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // console.log(this.router.url.split('/')[3]);
    this.showClientPortfolio(this.router.url.split('/')[3]);
  }

  showClientPortfolio(clientId) {
    this.managerService.getClientPortfolio(clientId)
      .subscribe(
        (clientData: any) => {
          this.client = clientData as ClientModel;
          // console.log(this.client);
        },
        error => console.log(error)
      );

  }

  deposit() {
    const dialogRef = this.dialog.open(UpdateBalanceComponent, {
      data: { id: this.client.id, availableBalance: this.client.availableBalance, isDeposit: true }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.showClientPortfolio(this.client.id);
      }
    });
  }

  withdraw() {
    const dialogRef = this.dialog.open(UpdateBalanceComponent, {
      data: { id: this.client.id, availableBalance: this.client.availableBalance, isDeposit: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.showClientPortfolio(this.client.id);
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
