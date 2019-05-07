import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPaymentPageComponent } from './containers/view-payment-page/view-payment-page.component';
import { PaymentsCollectionPageComponent } from './containers/payments-collection-page/payments-collection-page.component';

const routes: Routes = [
  // { path: '', component: PaymentsComponent }
  { path: '', component: PaymentsCollectionPageComponent },
  { path: 'detail', component: ViewPaymentPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
