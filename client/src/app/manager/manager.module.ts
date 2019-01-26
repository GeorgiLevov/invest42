import { UpdateClientInfoComponent } from './manager-modals/update-client/update-client.component';
import { CompanyPortfolioService } from './company-portfolio/company-portfolio.service';
import { MarketService } from './market/market.serivice';
import { MarketComponent } from './market/market.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-route.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { MaterializeWrapModule } from '../materialize-module/materialize.module';
import { ClientsComponent } from './clients/clients.component';
import { PositionsComponent } from './positions/positions.component';
import { ClientPositionsComponent } from './client-positions/client-positions.component';
import { ClientMarketComponent } from './client-market/client-market.component';
import { ClientWatchlistComponent } from './client-watchlist/client-watchlist.component';
import { ClientHistoryComponent } from './client-history/client-history.component';
import { ClientPortfolioComponent } from './client-portfolio/client-portfolio.component';
import { CompanyPortfolioComponent } from './company-portfolio/company-portfolio.component';
import { UpdateBalanceComponent } from './manager-modals/update-balance/update-balance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateOrderComponent } from './manager-modals/update-order/update-order.component';
import { BuyOrderComponent } from './manager-modals/buy-modal/buy-order.component';

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
    MaterializeWrapModule,
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
