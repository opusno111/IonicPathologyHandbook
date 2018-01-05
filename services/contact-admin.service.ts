import { Injectable, OnInit } from '@angular/core';
// Models
import { IContact, Contact } from './../models/contact';
import { IContactDetail, ContactDetail } from './../models/contact-detail';
import { IDepartment, Department } from '../models/department';
import { IQueryObject } from '../models/query-object';
import { IQueryResults, QueryResults } from '../models/query-results';
// Services
import { ContactService } from './contact.service';
import { ContactDetailsService } from './contact-details.service';
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
export class ContactAdminService {
  // Contact
  private contactsSubject = new BehaviorSubject<IContact[]>([]);
  contacts$ = this.contactsSubject.asObservable();
  // Contact
  private contactSubject = new BehaviorSubject<IContact>(new Contact());
  contact$ = this.contactSubject.asObservable();
  // Contact Details
  private contactDetailsSubject = new BehaviorSubject<IContactDetail[]>([]);
  contactDetails$ = this.contactDetailsSubject.asObservable();
  // Contact Detail
  private contactDetailSubject = new BehaviorSubject<IContactDetail>(new ContactDetail());
  contactDetail$ = this.contactDetailSubject.asObservable();
  // Department
  private departmentSubject = new BehaviorSubject<IDepartment>(new Department());
  department$ = this.departmentSubject.asObservable();
  // Query Results Object
  private queryResultsSubject = new BehaviorSubject<IQueryResults>(new QueryResults());
  queryResults$ = this.queryResultsSubject.asObservable();

  constructor(private _contactService: ContactService,
              private _contactDetailsService: ContactDetailsService,
              private _queryService: QueryObjectService) { }

    contactSelected(contact: IContact) {
      this.contactSubject.next(contact);
    }

    departmentSelected(department: IDepartment) {
      this.departmentSubject.next(department);
    }

    getContacts(): Subscription {
      return this._contactService.getContacts()
                  .do(contacts => this.contactsSubject.next(contacts))
                  .publishLast().refCount().subscribe();
    }

    postContact(contact: IContact): Observable<IContact> {
      console.log('tag type in admin service: ', contact);
      return this._contactService.postContact(contact)
                  .do(returnedContact => this.contactSubject.next(returnedContact))
                  .publishLast().refCount();
    }

    putContact(contact: IContact): Observable<number> {
      return this._contactService.putContact(contact);
    }

    postContactDetail(contactDetail: IContactDetail): Observable<IContactDetail> {
      console.log('tag type in admin service: ', contactDetail);
      return this._contactDetailsService.postContactDetail(contactDetail)
                  .do(returnedContactDetail => this.contactDetailSubject.next(returnedContactDetail))
                  .publishLast().refCount();
    }

    putContactDetail(contactDetail: IContactDetail): Observable<number> {
      return this._contactDetailsService.putContactDetail(contactDetail);
    }

    postQueryResults(queryObject: IQueryObject): Subscription {
      return this._contactService.postContactQuery(queryObject)
                  .do(queryResults => this.queryResultsSubject.next(queryResults))
                  .do(queryResults => this._queryService.broadcastNextQueryResults(queryResults))
                  .publishLast().refCount().subscribe();
    }

}
