import { Component, OnInit, OnDestroy } from '@angular/core';
import { Payment } from '../../payments.interface';
import { PaymentsService } from '../../payments.service';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Store, select } from '@ngrx/store';
import { State, getCurrentPayment } from '../../state/payment.reducer';
import { UpdatePayment } from '../../state/payment.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'asin-view-payment-page',
  templateUrl: './view-payment-page.component.html',
  styleUrls: ['./view-payment-page.component.scss']
})
export class ViewPaymentPageComponent implements OnInit, OnDestroy {

  payment: Payment;
  componentActive = true;

  constructor(
    private paymentsService: PaymentsService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.paymentsService.getPayment(id).subscribe((Response) => {
    //   this.payment = Response;
    // });
    this.store.pipe(
      select(getCurrentPayment),
      takeWhile(() => this.componentActive)
    ).subscribe(payment => this.payment = payment);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  // update payment gets called when either component that edits comments of the one that adds receipts emits a value
  updatePayment(paymentEdit: any) {
    const payload: { type: string, id: string, edit: string } = {
      type: null,
      id: this.payment.id,
      edit: paymentEdit
    };
    // check emitted value, if it's of type string then it must be the comment being edited
    if (typeof paymentEdit === 'string') {
      payload.type = 'comment';
      // else it has to be a recipt being added
    } else {
      payload.type = 'receipt';
    }
    // dispatch action to edit payment
    this.store.dispatch(new UpdatePayment(payload));
  }

}
