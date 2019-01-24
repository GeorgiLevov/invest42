import { CompanyPortfolioComponent } from './company-portfolio/company-portfolio.component';
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
        path: '', component: OverviewComponent,
        data: { animation: { value: 'manager' } }, children: [
            { path: '', redirectTo: 'market' },
            { path: 'market', component: MarketComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'positions', component: PositionsComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'clients', component: ClientsComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'market/company/:id', component: CompanyPortfolioComponent,
            data: { animation: { value: 'manager' } }, },
        ]
    },
    {
        path: 'client/:clientId', component: ManageClientComponent, children: [
            { path: '', redirectTo: 'portfolio' },
            { path: 'portfolio', component: ClientPortfolioComponent,
            data: { animation: { value: 'manager' } } },
            { path: 'positions', component: ClientPositionsComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'market', component: ClientMarketComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'watchlist', component: ClientWatchlistComponent,
            data: { animation: { value: 'manager' } }, },
            { path: 'history', component: ClientHistoryComponent,
            data: { animation: { value: 'manager' } }, },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
