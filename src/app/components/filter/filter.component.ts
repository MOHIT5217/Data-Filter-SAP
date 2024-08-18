import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filtersChanged = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      miniscore: [''],
      sort: ['date']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const filters = this.filterForm.value;
    this.filtersChanged.emit(filters);
  }

  onClear() {
    this.filterForm.reset();
    this.onSubmit(); // Emit the cleared filters
  }
}
