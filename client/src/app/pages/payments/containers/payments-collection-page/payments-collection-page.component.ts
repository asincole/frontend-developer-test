import { Component, OnInit, OnDestroy } from '@angular/core';
import { Payment } from '../../payments.interface';
import { Store, select } from '@ngrx/store';
import { CheckPaymentsTotal, SetCurrentPayment } from '../../state/payment.actions';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { State, getPayments, getTotalPayments } from '../../state/payment.reducer';

@Component({
  selector: 'asin-payments-collection-page',
  templateUrl: './payments-collection-page.component.html',
  styleUrls: ['./payments-collection-page.component.scss']
})
export class PaymentsCollectionPageComponent implements OnInit, OnDestroy {


  payments: Payment[];
  totalPages: number;
  currentPage = 1;
  componentActive = true;
  payments$: Payment[];
  totalPages$: number;
  currentQuery = false;
  tempStore$: Payment[];


  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {


    this.store.dispatch(new CheckPaymentsTotal());

    this.store.pipe(
      select(getPayments),
      takeWhile(() => this.componentActive)
    ).subscribe(payments => {
      this.tempStore$ = payments;
      this.payments$ = this.tempStore$;
    });

    this.store.pipe(
      select(getTotalPayments),
      takeWhile(() => this.componentActive)
    ).subscribe(totalPages => this.totalPages$ = totalPages);

  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  viewPayment(payment: Payment) {
    this.store.dispatch(new SetCurrentPayment(payment));
    this.router.navigateByUrl('/payments/detail');
  }

  search(query: string) {
    if (query.length >= 1) {
      this.currentQuery = true;
      this.payments$ = this.tempStore$.filter((payment) => {
        return payment.merchant.includes(query)
          || payment.user.first.includes(query)
          || payment.user.last.includes(query)
          || payment.user.email.includes(query)
          ;
      });
    } else {
      this.payments$ = this.tempStore$;
    }
    // this.router.navigate(['/payments/search', { search: query }]);
  }



}
