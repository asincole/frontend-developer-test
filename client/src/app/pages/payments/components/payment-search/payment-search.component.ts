import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { timer } from 'rxjs';
@Component({
  selector: 'asin-payment-search',
  templateUrl: './payment-search.component.html',
  styleUrls: ['./payment-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSearchComponent implements OnInit {

  searchForm: FormGroup;

  @Output() query: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.searchForm.get('query').valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.query.emit(value);
      });
  }

  createForm() {
    this.searchForm = this.fb.group({
      query: [null]
    });
  }

  // search() {
  //   if (!this.searchForm.valid) {
  //     alert('Please input a search parameter');
  //   } else {
  //     this.query.emit(this.searchForm.get('query').value);
  //   }
  // }
}
