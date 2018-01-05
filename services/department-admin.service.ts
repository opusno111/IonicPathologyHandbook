import { Injectable, OnInit } from '@angular/core';
// Models
import { IDepartment, Department } from './../models/department';
import { IQueryObject } from '../models/query-object';
import { IQueryResults, QueryResults } from '../models/query-results';
// Services
import { DepartmentService } from './department.service';
import { QueryObjectService } from './query-object.service';
// RxJs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishLast';

@Injectable()
export class DepartmentAdminService {

  // Departments
  private departmentsSubjects = new BehaviorSubject<IDepartment[]>([]);
  departments$ = this.departmentsSubjects.asObservable();
  // Contact Type
  private departmentSubject = new BehaviorSubject<IDepartment>(new Department());
  department$ = this.departmentSubject.asObservable();
  // Query Results Object
  private queryResultsSubject = new BehaviorSubject<IQueryResults>(new QueryResults());
  queryResults$ = this.queryResultsSubject.asObservable();

  constructor(private _departmentService: DepartmentService, private _queryService: QueryObjectService) { }

  departmentSelected(department: IDepartment) {
    this.departmentSubject.next(department);
  }

  getDepartments(): Subscription {
    return this._departmentService.getDepartments()
                .do(departments => this.departmentsSubjects.next(departments))
                .publishLast().refCount().subscribe();
  }

  postDepartments(department: IDepartment): Observable<IDepartment> {
    console.log('department in admin service: ', department);
    return this._departmentService.postDepartment(department)
                .do(returnedDepartment => this.departmentSubject.next(returnedDepartment))
                .publishLast().refCount();
  }

  postQueryResults(queryObject: IQueryObject): Subscription {
    return this._departmentService.postDepartmentQuery(queryObject)
                .do(queryResults => this.queryResultsSubject.next(queryResults))
                .do(queryResults => this._queryService.broadcastNextQueryResults(queryResults))
                .publishLast().refCount().subscribe();
  }

  putDepartments(department: IDepartment): Observable<number> {
    return this._departmentService.putDepartment(department);
  }

}
