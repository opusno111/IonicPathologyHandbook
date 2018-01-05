import { Injectable, OnInit } from '@angular/core';
// RxJs
import { Subject } from 'rxjs/Subject';
// Models
import { IDepartment } from './../models/department';
import { QueryObject } from './../models/query-object';
// Services
import { DepartmentService } from './department.service';

@Injectable()
export class StartUpService implements OnInit {

  private departmentsSubject = new Subject<IDepartment[]>();
  public departments$ = this.departmentsSubject.asObservable();
  departments: IDepartment[];

  constructor(private _departmentService: DepartmentService) { }

  ngOnInit(): void {
    const queryObj = new QueryObject();
    queryObj.active = true;
    queryObj.pageSize = 20;
    queryObj.page = 1;
    queryObj.searchTerm = '';

    this._departmentService.postDepartmentQuery(queryObj).subscribe(d => {
      this.departments = d.items;
      console.log('this.departments: ', d.items);
      this.departmentsSubject.next(this.departments);
    });
  }
}
