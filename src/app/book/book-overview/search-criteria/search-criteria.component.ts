import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchCriteria } from '../../book';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/shared/security/model/authorized-route';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss']
})
export class SearchCriteriaComponent {

  admin = Role.Admin;

  @Input()
  set criteria(criteria: SearchCriteria) {
    this.searchCriteriaForm.patchValue(criteria);
  }

  @Output()
  criteriaChange = new EventEmitter<SearchCriteria>();

  searchCriteriaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchCriteriaForm = formBuilder.group({
      author: formBuilder.control(''),
      title: formBuilder.control('')
    });
  }

  search() {
    this.criteriaChange.emit(this.searchCriteriaForm.value);
  }

}
