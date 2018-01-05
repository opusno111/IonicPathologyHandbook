import { Injectable, OnInit } from '@angular/core';
// Models
import { TagType } from './../models/tag-type';
import { ITagType } from '../models/tag-type';
import { IQueryObject } from '../models/query-object';
import { IQueryResults, QueryResults } from '../models/query-results';
// Services
import { TagTypeService } from './tag-type.service';
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
export class TagTypeAdminService implements OnInit {

  // Tag Types
  private tagTypesSubject = new BehaviorSubject<ITagType[]>([]);
  tagTypes$ = this.tagTypesSubject.asObservable();
  // Tag Type
  private tagTypeSubject = new BehaviorSubject<ITagType>(new TagType('', ''));
  tagType$ = this.tagTypeSubject.asObservable();
  // Query Results Object
  private queryResultsSubject = new BehaviorSubject<IQueryResults>(new QueryResults());
  queryResults$ = this.queryResultsSubject.asObservable();

  constructor(private _tagTypeService: TagTypeService, private _queryService: QueryObjectService) { }

  ngOnInit(): void { }

  tagTypeSelected(tagType: ITagType) {
    this.tagTypeSubject.next(tagType);
  }

  getTagTypes(): Subscription {
    return this._tagTypeService.getTagTypes()
                .do(tagTypes => this.tagTypesSubject.next(tagTypes))
                .publishLast().refCount().subscribe();
  }

  postTagTypes(tagType: ITagType): Observable<ITagType> {
    console.log('tag type in admin service: ', tagType);
    return this._tagTypeService.postTagType(tagType)
                .do(returnedTagType => this.tagTypeSubject.next(returnedTagType))
                .publishLast().refCount();
  }

  postQueryResults(queryObject: IQueryObject): Subscription {
    return this._tagTypeService.postTagTypeQuery(queryObject)
                .do(queryResults => this.queryResultsSubject.next(queryResults))
                .do(queryResults => this._queryService.broadcastNextQueryResults(queryResults))
                .publishLast().refCount().subscribe();
  }

  putTagTypes(tagType: ITagType): Observable<number> {
    return this._tagTypeService.putTagType(tagType);
  }
}
