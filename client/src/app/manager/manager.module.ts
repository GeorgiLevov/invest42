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
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule,
    MaterializeWrapModule,
  ],

  providers: [MarketService]
})
export class ManagerModule { }
