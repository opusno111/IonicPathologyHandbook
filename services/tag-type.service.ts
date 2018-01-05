import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ITagType } from './../models/tag-type';
import { IQueryResults } from '../models/query-results';

import { environment } from './../environments/environment';
import { IQueryObject } from '../models/query-object';

const HOST = environment.apiURL;

// GETS
const GET_TAG_TYPES = `${HOST}api/TagTypes`;
const GET_TAG_TYPE_BY_ID = `${HOST}api/TagTypes/`;
// POSTS
const POST_TAG_TYPE = `${HOST}api/TagTypes`;
const POST_TAG_TYPE_QUERY = `${HOST}api/TagTypes/query`;
// PUTS
const PUT_TAG_TYPE = `${HOST}api/TagTypes/`;
// DELETES
const DELETE_TAG_TYPE = `${HOST}api/TagTypes/`;

@Injectable()
export class TagTypeService {

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true});

  constructor(private _http: Http) { }

  getTagTypes(): Observable<ITagType[]> {
    return this._http.get(`${GET_TAG_TYPES}`, this.options)
              .map((resp: Response) => <ITagType[]>resp.json())
              .catch(this.handleError);
  }

  getTagTypeById(id: number): Observable<ITagType> {
    return this._http.get(`${GET_TAG_TYPE_BY_ID}${id}`, this.options)
              .map((resp: Response) => <ITagType>resp.json())
              .catch(this.handleError);
  }

  putTagType(tagType: ITagType): Observable<number> {
    return this._http.put(`${PUT_TAG_TYPE}${tagType.id}`, tagType, this.options)
              .map((resp: Response) => <number>resp.json())
              .catch(this.handleError);
  }

  postTagType(tagType: ITagType): Observable<ITagType> {
    console.log('tag type service: ', tagType);
    return this._http.post(`${POST_TAG_TYPE}`, tagType, this.options)
              .map((resp: Response) => <ITagType>resp.json())
              .catch(this.handleError);
  }

  postTagTypeQuery(queryObject: IQueryObject): Observable<IQueryResults> {
    return this._http.post(`${POST_TAG_TYPE_QUERY}`, queryObject, this.options)
              .map((resp: Response) => <IQueryResults>resp.json())
              .catch(this.handleError);
  }

  deleteTagType(tagType: ITagType): Observable<ITagType> {
    return this._http.delete(`${POST_TAG_TYPE}${tagType.id}`, this.options)
              .map((resp: Response) => <ITagType>resp.json())
              .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }
}
