import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWatchlistComponent } from './client-watchlist.component';

describe('ClientWatchlistComponent', () => {
  let component: ClientWatchlistComponent;
  let fixture: ComponentFixture<ClientWatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
