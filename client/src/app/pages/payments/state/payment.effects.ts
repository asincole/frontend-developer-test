import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PaymentsService } from '../payments.service';
import { PaymentActionTypes } from './payment.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as paymentActions from './payment.actions';
import { Payment, PaymentResponse } from '../payments.interface';

@Injectable()
export class PaymentEffects {
    // @Effect() loadPayments$: Observable<Action> = this.actions$.pipe(ofType('ACTIONTYPE'));
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

    @Effect()
    updatePayments$ = this.actions$
        .pipe(
            ofType(PaymentActionTypes.UpdatePayment),
            mergeMap((action: paymentActions.UpdatePayment) => this.paymentsService.updatePayment(
               action.payload.type, action.payload.id, action.payload.edit
            ).pipe(
                map((payments: Payment) => (new paymentActions.UpdatePaymentSuccess(payments))),
                // tslint:disable-next-line: deprecation
                catchError(err => of(new paymentActions.UpdatePaymentFail(err)))
            ))
        );

    constructor(
        private actions$: Actions,
        private paymentsService: PaymentsService
    ) { }
}
