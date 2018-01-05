import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IContactDetail } from './../models/contact-detail';
import { IQueryResults } from '../models/query-results';

import { environment } from './../environments/environment';
import { IQueryObject } from '../models/query-object';

const HOST = environment.apiURL;

// GETS
const GET_CONTACT_DETAILS = `${HOST}api/ContactDetails`;
const GET_CONTACT_DETAIL_BY_ID = `${HOST}api/ContactDetails/`;
// POSTS
const POST_CONTACT_DETAIL = `${HOST}api/ContactDetails`;
const POST_CONTACT_DETAIL_QUERY = `${HOST}api/ContactDetails/query`;
// PUTS
const PUT_CONTACT_DETAIL = `${HOST}api/ContactDetails/`;
// DELETES
const DELETE_CONTACT_DETAIL = `${HOST}api/ContactDetails/`;

@Injectable()
export class ContactDetailsService {
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true});

  constructor(private _http: Http) { }

  getContactDetails(): Observable<IContactDetail[]> {
    return this._http.get(`${GET_CONTACT_DETAILS}`, this.options)
              .map((resp: Response) => <IContactDetail[]>resp.json())
              .catch(this.handleError);
  }

  getContactDetailById(id: number): Observable<IContactDetail> {
    return this._http.get(`${GET_CONTACT_DETAIL_BY_ID}${id}`, this.options)
              .map((resp: Response) => <IContactDetail>resp.json())
              .catch(this.handleError);
  }

  putContactDetail(contactDetail: IContactDetail): Observable<number> {
    return this._http.put(`${PUT_CONTACT_DETAIL}${contactDetail.id}`, contactDetail, this.options)
              .map((resp: Response) => <number>resp.json())
              .catch(this.handleError);
  }

  postContactDetail(contactDetail: IContactDetail): Observable<IContactDetail> {
    console.log('tag type service: ', contactDetail);
    return this._http.post(`${POST_CONTACT_DETAIL}`, contactDetail, this.options)
              .map((resp: Response) => <IContactDetail>resp.json())
              .catch(this.handleError);
  }

  postContactDetailQuery(queryObject: IQueryObject): Observable<IQueryResults> {
    return this._http.post(`${POST_CONTACT_DETAIL_QUERY}`, queryObject, this.options)
              .map((resp: Response) => <IQueryResults>resp.json())
              .catch(this.handleError);
  }

  deleteContactDetail(contactDetail: IContactDetail): Observable<IContactDetail> {
    return this._http.delete(`${POST_CONTACT_DETAIL}${contactDetail.id}`, this.options)
              .map((resp: Response) => <IContactDetail>resp.json())
              .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }

}
