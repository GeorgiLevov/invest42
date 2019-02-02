import { UpdateClientInfoComponent } from './manager-modals/update-client/update-client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-route.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateBalanceComponent } from './manager-modals/update-balance/update-balance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateOrderComponent } from './manager-modals/update-order/update-order.component';
import { BuyOrderComponent } from './manager-modals/buy-modal/buy-order.component';
import { MaterialWrapModule } from '../material-module/material.module';
import { ManageClientComponent } from './management/manage-client/manage-client.component';
import { ClientsComponent } from './manager-overview/clients/clients.component';
import { PositionsComponent } from './manager-overview/positions/positions.component';
import { ClientPositionsComponent } from './management/client-positions/client-positions.component';
import { ClientMarketComponent } from './management/client-market/client-market.component';
import { ClientWatchlistComponent } from './management/client-watchlist/client-watchlist.component';
import { ClientHistoryComponent } from './management/client-history/client-history.component';
import { ClientPortfolioComponent } from './management/client-portfolio/client-portfolio.component';
import { MarketComponent } from './manager-overview/market/market.component';
import { CompanyPortfolioComponent } from './manager-overview/company-portfolio/company-portfolio.component';
import { MarketService } from './manager-overview/market/market.serivice';
import { CompanyPortfolioService } from './manager-overview/company-portfolio/company-portfolio.service';
import { OverviewComponent } from './manager-overview/overview/overview.component';

@NgModule({
  declarations: [
    ManagerComponent,
    OverviewComponent,
    ManageClientComponent,
    ClientsComponent,
    PositionsComponent,
    ClientPositionsComponent,
    ClientMarketComponent,
    ClientWatchlistComponent,
    ClientHistoryComponent,
    ClientPortfolioComponent,
    MarketComponent,
    CompanyPortfolioComponent,
    UpdateBalanceComponent,
    UpdateClientInfoComponent,
    UpdateOrderComponent,
    BuyOrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule,
    MaterialWrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UpdateBalanceComponent,
    UpdateClientInfoComponent,
    UpdateOrderComponent,
    BuyOrderComponent,
  ],
  providers: [MarketService, CompanyPortfolioService]
})
export class ManagerModule { }
