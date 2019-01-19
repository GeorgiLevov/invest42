import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMarketComponent } from './client-market.component';

describe('ClientMarketComponent', () => {
  let component: ClientMarketComponent;
  let fixture: ComponentFixture<ClientMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
