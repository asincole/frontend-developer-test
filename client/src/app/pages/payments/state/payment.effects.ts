import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PaymentsService } from '../payments.service';
import { PaymentActionTypes } from './payment.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as paymentActions from './payment.actions';
import { Payment, PaymentResponse } from '../payments.interface';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class PaymentEffects {
    // since client side fitering is required and API does not return all data which should actually be the case
    // this makes a first call, basically to check the amount of payments that exists then dispatches the load action 
    // setting its limit to be the total number payments discovered
    // looks better than calling the API recursively
    @Effect()
    checkPaymentsTotal$ = this.actions$
        .pipe(
            ofType(PaymentActionTypes.CheckPaymentsTotal),
            mergeMap((action: paymentActions.CheckPaymentsTotal) => this.paymentsService.getPayments()
                .pipe(
                    map((payments: PaymentResponse) => (new paymentActions.Load(payments.total))),
                    // tslint:disable-next-line: deprecation
                    catchError(err => of(new paymentActions.LoadFail(err)))
                ))
        );

    // load all payments effect
    @Effect()
    loadPayments$ = this.actions$
        .pipe(
            ofType(PaymentActionTypes.Load),
            mergeMap((action: paymentActions.Load) => this.paymentsService.getPayments(action.payload)
                .pipe(
                    map((payments: PaymentResponse) => (new paymentActions.LoadSuccess(payments))),
                    // tslint:disable-next-line: deprecation
                    catchError(err => of(new paymentActions.LoadFail(err)))
                ))
        );

    // update payment 
    @Effect()
    updatePayments$ = this.actions$
        .pipe(
            ofType(PaymentActionTypes.UpdatePayment),
            mergeMap((action: paymentActions.UpdatePayment) => this.paymentsService.updatePayment(
                action.payload.type, action.payload.id, action.payload.edit
            ).pipe(
                map((payments: Payment) => {
                    this.createMessage('success', 'Payment updated successfully');
                    return (new paymentActions.UpdatePaymentSuccess(payments));
                }),
                catchError(err => {
                    this.createMessage('error', 'Something went wrong, please try again');
                    // tslint:disable-next-line: deprecation
                    return of(new paymentActions.UpdatePaymentFail(err));
                })
            ))
        );

    createMessage(type: string, message: string): void {
        this.message.create(type, message);
    }

    constructor(
        private actions$: Actions,
        private paymentsService: PaymentsService,
        private message: NzMessageService
    ) { }
}
