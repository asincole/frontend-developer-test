import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'asin-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentEditComponent implements OnInit {

  commentForm: FormGroup;
  @Input() loading = false;
  @Output() commentEdit: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: [null, Validators.required]
    });
  }

  submit() {
    if (!this.commentForm.valid) {
      alert('please add a comment');
    } else {
      // this.loading = true;
      this.commentEdit.emit(this.commentForm.get('comment').value);
    }
  }

}
