import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'asin-receipt-upload',
  templateUrl: './receipt-upload.component.html',
  styleUrls: ['./receipt-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptUploadComponent implements OnInit {
  @Input() id: string;
  fileList: UploadFile[] = [];

  @Output() receipt: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  handleUpload() {
    const formData = new FormData();

    this.fileList.forEach((file: any) => {
      formData.append('receipt', file);
    });

    this.receipt.emit(formData);
  }

}
