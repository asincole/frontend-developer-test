import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ViewPaymentPageComponent } from './containers/view-payment-page/view-payment-page.component';
import { PaymentsCollectionPageComponent } from './containers/payments-collection-page/payments-collection-page.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentSearchComponent } from './components/payment-search/payment-search.component';
import { ReceiptUploadComponent } from './components/receipt-upload/receipt-upload.component';

@NgModule({
  declarations: [ViewPaymentPageComponent, PaymentsCollectionPageComponent, CommentEditComponent, PaymentDetailComponent, PaymentListComponent, PaymentSearchComponent, ReceiptUploadComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
