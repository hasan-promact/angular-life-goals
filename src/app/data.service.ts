import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/behaviorSubject';

@Injectable()
export class DataService {

  private goals = new BehaviorSubject<any>(['The initial goal','another silly life goal']);
  goal = this.goals.asObservable();
  constructor() { }

  changeGoal(goal){
    this.goals.next(goal);
  }

}
