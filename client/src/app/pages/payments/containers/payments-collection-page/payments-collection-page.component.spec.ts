import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCollectionPageComponent } from './payments-collection-page.component';

describe('PaymentsCollectionPageComponent', () => {
  let component: PaymentsCollectionPageComponent;
  let fixture: ComponentFixture<PaymentsCollectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsCollectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsCollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
