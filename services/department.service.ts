import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// Models
import { IDepartment } from './../models/department';
import { IQueryResults } from '../models/query-results';
import { IQueryObject } from '../models/query-object';

import { environment } from './../environments/environment';

const HOST = environment.apiURL;

// GETS
const GET_DEPARTMENTS = `${HOST}api/Departments`;
const GET_DEPARTMENT_BY_ID = `${HOST}api/Departments/`;
// POSTS
const POST_DEPARTMENT = `${HOST}api/Departments`;
const POST_DEPARTMENT_QUERY = `${HOST}api/Departments/query`;
// PUTS
const PUT_DEPARTMENT = `${HOST}api/Departments/`;
// DELETES
const DELETE_DEPARTMENT = `${HOST}api/Departments/`;

@Injectable()
export class DepartmentService {

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true});

  constructor(private _http: Http) { }

  getDepartments(): Observable<IDepartment[]> {
    return this._http.get(`${GET_DEPARTMENTS}`, this.options)
              .map((resp: Response) => <IDepartment[]>resp.json())
              .catch(this.handleError);
  }

  getDepartmentById(id: number): Observable<IDepartment> {
    return this._http.get(`${GET_DEPARTMENT_BY_ID}${id}`, this.options)
              .map((resp: Response) => <IDepartment>resp.json())
              .catch(this.handleError);
  }

  putDepartment(department: IDepartment): Observable<number> {
    return this._http.put(`${PUT_DEPARTMENT}${department.id}`, department, this.options)
              .map((resp: Response) => <number>resp.json())
              .catch(this.handleError);
  }

  postDepartment(department: IDepartment): Observable<IDepartment> {
    console.log('tag type service: ', department);
    return this._http.post(`${POST_DEPARTMENT}`, department, this.options)
              .map((resp: Response) => <IDepartment>resp.json())
              .catch(this.handleError);
  }

  postDepartmentQuery(queryObject: IQueryObject): Observable<IQueryResults> {
    return this._http.post(`${POST_DEPARTMENT_QUERY}`, queryObject, this.options)
              .map((resp: Response) => <IQueryResults>resp.json())
              .catch(this.handleError);
  }

  deleteDepartment(department: IDepartment): Observable<IDepartment> {
    return this._http.delete(`${POST_DEPARTMENT}${department.id}`, this.options)
              .map((resp: Response) => <IDepartment>resp.json())
              .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }


}
