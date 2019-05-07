import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Payment } from '../../payments.interface';

@Component({
  selector: 'asin-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentListComponent implements OnInit {

  @Input() payments: Payment[];

  @Input() totalPages: number;

  @Output() selectedPayment: EventEmitter<Payment> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectPayment(payment: Payment) {
    this.selectedPayment.emit(payment);
  }
}
