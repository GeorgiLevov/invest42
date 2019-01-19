import { ClientHistoryComponent } from './client-history/client-history.component';
import { ClientWatchlistComponent } from './client-watchlist/client-watchlist.component';
import { ClientMarketComponent } from './client-market/client-market.component';
import { ClientPortfolioComponent } from './client-portfolio/client-portfolio.component';
import { ClientsComponent } from './clients/clients.component';
import { PositionsComponent } from './positions/positions.component';
import { MarketComponent } from './market/market.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ClientPositionsComponent } from './client-positions/client-positions.component';

const routes: Routes = [
    {
        path: '', component: OverviewComponent, children: [
            { path: '', redirectTo: 'market' },
            { path: 'market', component: MarketComponent },
            { path: 'positions', component: PositionsComponent },
            { path: 'clients', component: ClientsComponent },
        ]
    },
    {
        path: 'client/:clientId', component: ManageClientComponent, children: [
            { path: '', redirectTo: 'portfolio' },
            { path: 'portfolio', component: ClientPortfolioComponent },
            { path: 'positions', component: ClientPositionsComponent },
            { path: 'market', component: ClientMarketComponent },
            { path: 'watchlist', component: ClientWatchlistComponent },
            { path: 'history', component: ClientHistoryComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
