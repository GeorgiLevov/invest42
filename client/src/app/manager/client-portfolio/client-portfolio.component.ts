import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../models/interfaces/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../services/manager.service';
import { MatDialog } from '@angular/material';
import { UpdateBalanceComponent } from '../manager-modals/update-balance/update-balance.component';

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
    // should be impl
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
    // should be impl
  }

  editAccount() {
    // should be impl
  }

}
