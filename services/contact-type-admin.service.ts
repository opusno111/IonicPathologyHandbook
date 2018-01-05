import { Injectable, OnInit } from '@angular/core';
// Models
import { ContactType } from './../models/contact-type';
import { IContactType } from '../models/contact-type';
import { IQueryObject } from '../models/query-object';
import { IQueryResults, QueryResults } from '../models/query-results';
// Services
import { ContactTypeService } from './contact-type.service';
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
export class ContactTypeAdminService {

  // Contact Types
  private contactTypesSubject = new BehaviorSubject<IContactType[]>([]);
  contactTypes$ = this.contactTypesSubject.asObservable();
  // Contact Type
  private contactTypeSubject = new BehaviorSubject<IContactType>(new ContactType());
  contactType$ = this.contactTypeSubject.asObservable();
  // Query Results Object
  private queryResultsSubject = new BehaviorSubject<IQueryResults>(new QueryResults());
  queryResults$ = this.queryResultsSubject.asObservable();

  constructor(private _contactTypeService: ContactTypeService, private _queryService: QueryObjectService) { }

  contactTypeSelected(contactType: IContactType) {
    this.contactTypeSubject.next(contactType);
  }

  getContactTypes(): Subscription {
    return this._contactTypeService.getContactTypes()
                .do(ContactTypes => this.contactTypesSubject.next(ContactTypes))
                .publishLast().refCount().subscribe();
  }

  postContactTypes(contactType: IContactType): Observable<IContactType> {
    console.log('tag type in admin service: ', contactType);
    return this._contactTypeService.postContactType(contactType)
                .do(returnedContactType => this.contactTypeSubject.next(returnedContactType))
                .publishLast().refCount();
  }

  postQueryResults(queryObject: IQueryObject): Subscription {
    return this._contactTypeService.postContactTypeQuery(queryObject)
                .do(queryResults => this.queryResultsSubject.next(queryResults))
                .do(queryResults => this._queryService.broadcastNextQueryResults(queryResults))
                .publishLast().refCount().subscribe();
  }

  putContactTypes(contactType: IContactType): Observable<number> {
    return this._contactTypeService.putContactType(contactType);
  }
}
