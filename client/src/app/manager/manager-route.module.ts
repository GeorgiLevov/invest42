import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './manager-overview/overview/overview.component';
import { MarketComponent } from './manager-overview/market/market.component';
import { PositionsComponent } from './manager-overview/positions/positions.component';
import { ClientsComponent } from './manager-overview/clients/clients.component';
import { CompanyPortfolioComponent } from './manager-overview/company-portfolio/company-portfolio.component';
import { ManageClientComponent } from './management/manage-client/manage-client.component';
import { ClientPortfolioComponent } from './management/client-portfolio/client-portfolio.component';
import { ClientPositionsComponent } from './management/client-positions/client-positions.component';
import { ClientMarketComponent } from './management/client-market/client-market.component';
import { ClientWatchlistComponent } from './management/client-watchlist/client-watchlist.component';
import { ClientHistoryComponent } from './management/client-history/client-history.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '', component: OverviewComponent,
        data: { animation: { value: 'manager' } }, children: [
            { path: '', redirectTo: 'market' },
            {
                path: 'market', component: MarketComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'positions', component: PositionsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'clients', component: ClientsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'market/company/:id', component: CompanyPortfolioComponent,
                data: { animation: { value: 'manager' } },
            },
        ]
    },
    {
        path: 'client/:clientId', component: ManageClientComponent, children: [
            { path: '', redirectTo: 'portfolio' },
            {
                path: 'portfolio', component: ClientPortfolioComponent,
                data: { animation: { value: 'manager' } }
            },
            {
                path: 'positions', component: ClientPositionsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'market', component: ClientMarketComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'watchlist', component: ClientWatchlistComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'history', component: ClientHistoryComponent,
                data: { animation: { value: 'manager' } },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
