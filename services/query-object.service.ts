import { Injectable, OnInit } from '@angular/core';
// Models
import { IQueryObject, QueryObject } from '../models/query-object';
import { IQueryResults, QueryResults } from '../models/query-results';
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
export class QueryObjectService {

  // Query Results Object
  private queryResultsSubject = new Subject<IQueryResults>();
  queryResults$ = this.queryResultsSubject.asObservable();
  // Query Object Object
  private queryObjectSubject = new Subject<IQueryObject>();
  queryObject$ = this.queryObjectSubject.asObservable();

  private lastQueryObject: IQueryObject;
  private lastQueryResults: IQueryResults;

  constructor() { }

  broadcastNextQueryObject(queryObject: IQueryObject): void {
    this.lastQueryObject = queryObject;
    this.queryObjectSubject.next(queryObject);
  }

  broadcastLastQueryObject(): void {
    if (this.lastQueryObject) {
      this.broadcastNextQueryObject(this.lastQueryObject);
    }
  }

  broadcastNextQueryResults(queryResults: IQueryResults): void {
    this.lastQueryResults = queryResults;
    this.queryResultsSubject.next(queryResults);
  }

  broadcastLastQueryResults(): void {
    if (this.lastQueryResults) {
      this.broadcastNextQueryResults(this.lastQueryResults);
    }
  }

}
