import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommentEditComponent } from 'src/app/pages/payments/components/comment-edit/comment-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiptUploadComponent } from 'src/app/pages/payments/components/receipt-upload/receipt-upload.component';
import { ViewPaymentPageComponent } from './containers/view-payment-page/view-payment-page.component';
import { PaymentsCollectionPageComponent } from './containers/payments-collection-page/payments-collection-page.component';
import { PaymentSearchComponent } from './components/payment-search/payment-search.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/payment.reducer';
import { PaymentEffects } from './state/payment.effects';

@NgModule({
  declarations: [
    PaymentListComponent,
    CommentEditComponent,
    ReceiptUploadComponent,
    ViewPaymentPageComponent,
    PaymentsCollectionPageComponent,
    PaymentSearchComponent,
    PaymentDetailComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    StoreModule.forFeature('payment', reducer),
    EffectsModule.forFeature([PaymentEffects])
  ]
})
export class PaymentsModule { }
