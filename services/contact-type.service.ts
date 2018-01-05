import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IContactType } from './../models/contact-type';
import { IQueryResults } from '../models/query-results';

import { environment } from './../environments/environment';
import { IQueryObject } from '../models/query-object';

const HOST = environment.apiURL;

// GETS
const GET_CONTACT_TYPES = `${HOST}api/ContactTypes`;
const GET_CONTACT_TYPE_BY_ID = `${HOST}api/ContactTypes/`;
// POSTS
const POST_CONTACT_TYPE = `${HOST}api/ContactTypes`;
const POST_CONTACT_TYPE_QUERY = `${HOST}api/ContactTypes/query`;
// PUTS
const PUT_CONTACT_TYPE = `${HOST}api/ContactTypes/`;
// DELETES
const DELETE_CONTACT_TYPE = `${HOST}api/ContactTypes/`;

@Injectable()
export class ContactTypeService {

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true});

  constructor(private _http: Http) { }

  getContactTypes(): Observable<IContactType[]> {
    return this._http.get(`${GET_CONTACT_TYPES}`, this.options)
              .map((resp: Response) => <IContactType[]>resp.json())
              .catch(this.handleError);
  }

  getContactTypeById(id: number): Observable<IContactType> {
    return this._http.get(`${GET_CONTACT_TYPE_BY_ID}${id}`, this.options)
              .map((resp: Response) => <IContactType>resp.json())
              .catch(this.handleError);
  }

  putContactType(contactType: IContactType): Observable<number> {
    return this._http.put(`${PUT_CONTACT_TYPE}${contactType.id}`, contactType, this.options)
              .map((resp: Response) => <number>resp.json())
              .catch(this.handleError);
  }

  postContactType(contactType: IContactType): Observable<IContactType> {
    console.log('tag type service: ', contactType);
    return this._http.post(`${POST_CONTACT_TYPE}`, contactType, this.options)
              .map((resp: Response) => <IContactType>resp.json())
              .catch(this.handleError);
  }

  postContactTypeQuery(queryObject: IQueryObject): Observable<IQueryResults> {
    return this._http.post(`${POST_CONTACT_TYPE_QUERY}`, queryObject, this.options)
              .map((resp: Response) => <IQueryResults>resp.json())
              .catch(this.handleError);
  }

  deleteContactType(contactType: IContactType): Observable<IContactType> {
    return this._http.delete(`${POST_CONTACT_TYPE}${contactType.id}`, this.options)
              .map((resp: Response) => <IContactType>resp.json())
              .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }

}
