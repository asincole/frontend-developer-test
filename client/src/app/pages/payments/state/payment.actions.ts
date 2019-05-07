import { Action } from '@ngrx/store';
import { Payment, PaymentResponse } from '../payments.interface';

export enum PaymentActionTypes {
    SetCurrentPayment = '[Payment] Set Current Payment',
    CheckPaymentsTotal = '[Payment] Check Payments Total',
    Load = '[Payment] Load',
    LoadSuccess = '[Payment] Load Success',
    LoadFail = '[Payment] Load Fail',
    UpdatePayment = '[Payment] Update Payment',
    UpdatePaymentSuccess = '[Payment] Update Payment Success',
    UpdatePaymentFail = '[Payment] Update Payment Fail',
    SearchPayments = '[Payments] Search Payments'
}

export class SetCurrentPayment implements Action {
    readonly type = PaymentActionTypes.SetCurrentPayment;
    constructor(public payload: Payment) { }
}

export class CheckPaymentsTotal implements Action {
    readonly type = PaymentActionTypes.CheckPaymentsTotal;
}

export class Load implements Action {
    readonly type = PaymentActionTypes.Load;
    constructor(public payload: number) { }
}

export class LoadSuccess implements Action {
    readonly type = PaymentActionTypes.LoadSuccess;
    constructor(public payload: PaymentResponse) { }
}

export class LoadFail implements Action {
    readonly type = PaymentActionTypes.LoadFail;
    constructor(public payload: string) { }
}

export class UpdatePayment implements Action {
    readonly type = PaymentActionTypes.UpdatePayment;
    constructor(public payload: { type: string, id: string, edit: string | FormData }) { }
}

export class UpdatePaymentSuccess implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentSuccess;
    constructor(public payload: Payment) { }
}

export class UpdatePaymentFail implements Action {
    readonly type = PaymentActionTypes.UpdatePaymentFail;
    constructor(public payload: string) { }
}

export class SearchPayments implements Action {
    readonly type = PaymentActionTypes.SearchPayments;
    constructor(public payload: string) { }
}


export type PaymentActions = SetCurrentPayment |
    Load |
    LoadSuccess |
    LoadFail |
    UpdatePayment |
    UpdatePaymentSuccess |
    UpdatePaymentFail |
    SearchPayments;
