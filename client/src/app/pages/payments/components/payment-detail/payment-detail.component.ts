import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Payment } from '../../payments.interface';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'asin-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDetailComponent implements OnInit {

  @Input() payment: Payment;
  @Output() commentUpdate: EventEmitter<string> = new EventEmitter();
  @Output() receipt: EventEmitter<any> = new EventEmitter();
  showCommentModal = false;
  showReceiptModal = false;

  constructor() { }

  ngOnInit() {
  }

  updateComment(comment: string) {
    this.commentUpdate.emit(comment);
    this.commentModalToggle();
  }

  addReceipt(payment) {
    this.receipt.emit(payment);
    this.receiptModalToggle();
  }

  commentModalToggle() {
    this.showCommentModal = !this.showCommentModal;
  }

  receiptModalToggle() {
    this.showReceiptModal = !this.showReceiptModal;
  }

}
