import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IContact } from './../models/contact';
import { IQueryResults } from '../models/query-results';

import { environment } from './../environments/environment';
import { IQueryObject } from '../models/query-object';

const HOST = environment.apiURL;

// GETS
const GET_CONTACTS = `${HOST}api/Contacts`;
const GET_CONTACT_BY_ID = `${HOST}api/Contacts/`;
// POSTS
const POST_CONTACT = `${HOST}api/Contacts`;
const POST_CONTACT_QUERY = `${HOST}api/Contacts/query`;
// PUTS
const PUT_CONTACT = `${HOST}api/Contacts/`;
// DELETES
const DELETE_CONTACT = `${HOST}api/Contacts/`;


@Injectable()
export class ContactService {
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true});

  constructor(private _http: Http) { }

  getContacts(): Observable<IContact[]> {
    return this._http.get(`${GET_CONTACTS}`, this.options)
              .map((resp: Response) => <IContact[]>resp.json())
              .catch(this.handleError);
  }

  getContactById(id: number): Observable<IContact> {
    return this._http.get(`${GET_CONTACT_BY_ID}${id}`, this.options)
              .map((resp: Response) => <IContact>resp.json())
              .catch(this.handleError);
  }

  putContact(contact: IContact): Observable<number> {
    return this._http.put(`${PUT_CONTACT}${contact.id}`, contact, this.options)
              .map((resp: Response) => <number>resp.json())
              .catch(this.handleError);
  }

  postContact(contact: IContact): Observable<IContact> {
    console.log('tag type service: ', contact);
    return this._http.post(`${POST_CONTACT}`, contact, this.options)
              .map((resp: Response) => <IContact>resp.json())
              .catch(this.handleError);
  }

  postContactQuery(queryObject: IQueryObject): Observable<IQueryResults> {
    return this._http.post(`${POST_CONTACT_QUERY}`, queryObject, this.options)
              .map((resp: Response) => <IQueryResults>resp.json())
              .catch(this.handleError);
  }

  deleteContact(contact: IContact): Observable<IContact> {
    return this._http.delete(`${POST_CONTACT}${contact.id}`, this.options)
              .map((resp: Response) => <IContact>resp.json())
              .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }

}
