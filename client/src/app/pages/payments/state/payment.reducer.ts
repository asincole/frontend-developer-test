import { Payment } from '../payments.interface';
import * as fromRoot from '../../../reducers/index';
import { PaymentActions, PaymentActionTypes } from './payment.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface PaymentState {
    payments: Payment[];
    totalPayments: number;
    currentPaymentId: string | null;
    searchResults: Payment[];
    error: string;
}

export interface State extends fromRoot.State {
    payment: PaymentState;
}

const initialState: PaymentState = {
    payments: [],
    totalPayments: null,
    currentPaymentId: null,
    searchResults: [],
    error: ''
};

export function reducer(state = initialState, action: PaymentActions): PaymentState {
    switch (action.type) {
        case PaymentActionTypes.SetCurrentPayment:
            return {
                ...state,
                currentPaymentId: action.payload.id
            };

        case PaymentActionTypes.LoadSuccess:
            return {
                ...state,
                payments: action.payload.payments,
                totalPayments: action.payload.total,
                error: ''
            };

        case PaymentActionTypes.LoadFail:
            return {
                ...state,
                payments: [],
                totalPayments: null,
                error: action.payload
            };

        case PaymentActionTypes.UpdatePaymentSuccess:
            const updatedPayment = state.payments.map(payment => payment.id === action.payload.id ? action.payload : payment);
            return {
                ...state,
                payments: updatedPayment,
                error: ''
            };

        case PaymentActionTypes.UpdatePaymentFail:
            return {
                ...state,
                error: action.payload
            };

        // case PaymentActionTypes.SearchPayments:
        //     const result = state.payments.filter((payment) => {
        //         // return payment.merchant.toLowerCase() === action.payload
        //         return payment.user.first.toLowerCase() === action.payload
        //             // || payment.user.last.toLowerCase() === action.payload
        //             // || payment.user.email.toLowerCase() === action.payload
        //             ;
        //     });
        //     return {
        //         ...state,
        //         searchResults: result
        //     };


        default:
            return state;

    }
}

const getPaymentFeatureState = createFeatureSelector<State, PaymentState>('payment');

export const getPayments = createSelector(getPaymentFeatureState, (state: PaymentState) => {
    return state.payments;
});

export const getTotalPayments = createSelector(getPaymentFeatureState, (state: PaymentState) => {
    return state.totalPayments;
});

export const getCurrentPaymentId = createSelector(getPaymentFeatureState, (state: PaymentState) => {
    return state.currentPaymentId;
});

// export const getSearchResults = createSelector(getPaymentFeatureState, (state: PaymentState) => {
//     return state.searchResults;
// });

export const getCurrentPayment = createSelector(getPaymentFeatureState, getCurrentPaymentId, (state: PaymentState, currentPaymentId) => {
    if (!currentPaymentId) {
        return {
            id: null,
            amount: { value: null, currency: null },
            date: null,
            merchant: null,
            receipts: [],
            comment: null,
            category: null,
            user: { first: null, last: null, email: null, },
            index: 0
        };
    } else {
        return currentPaymentId ? state.payments.find((payment) => payment.id === currentPaymentId) : null;
    }
});

export const getError = createSelector(getPaymentFeatureState, (state: PaymentState) => {
    return state.error;
});
