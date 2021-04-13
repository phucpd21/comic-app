import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class ShareDataService {

  private idSource = new BehaviorSubject<Number>(0);
  currentId = this.idSource.asObservable();

  constructor() { }

  changeIdSource(id: Number) {
    this.idSource.next(id);
  }

}
