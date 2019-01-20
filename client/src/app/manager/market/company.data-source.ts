// import {CollectionViewer, DataSource} from '@angular/cdk/collections';
// import { CompanyModel } from 'src/app/models/companies/company.model';
// import { MarketService } from './market.serivice';
// import { Observable, BehaviorSubject } from 'rxjs';

// export class LessonsDataSource implements DataSource<CompanyModel> {

//     private companiesSubject = new BehaviorSubject<CompanyModel[]>([]);
//     private loadingSubject = new BehaviorSubject<boolean>(false);

//     public loading$ = this.loadingSubject.asObservable();

//     constructor(private marketService: MarketService) {}

//     // connect and disconnect provide the CollevtionViewer observable ->
//     // emitting information about the data being displayed (startIndex, endIndex)
//     connect(collectionViewer: CollectionViewer): Observable<CompanyModel[]> {
//       return this.companiesSubject.asObservable();
//     }

//     disconnect(collectionViewer: CollectionViewer): void {
//       this.companiesSubject.complete();
//       this.loadingSubject.complete();
//     }

//     loadCompanies(filter: string,
//                 sortDirection: string, pageIndex: number, pageSize: number) {
      
//     }
// }