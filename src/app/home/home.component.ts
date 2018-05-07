import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style , query , stagger , keyframes} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('* => *',[
        query(":enter", style({opacity:0}), {optional:true}),
        query(":enter", stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform:'translateY(-75%)', offset:0}),
            style({opacity:0.5, transform:'translateY(35px)', offset:0.3}),
            style({opacity:1, transform:'translateY(0)', offset:1}),
          ]))]), {optional:true}),

        query(":leave", stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform:'translateY(0)', offset:0}),
            style({opacity:0.5, transform:'translateY(35px)', offset:0.3}),
            style({opacity:0, transform:'translateY(-75%)', offset:1}),
          ]))]), {optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount:Number;
  btnTxt:String = "Add Item";
  goalTxt:String = "My first life goal";
  goals=[];
  constructor(private _data:DataService) { }

  ngOnInit() {
    
    this._data.goal.subscribe(res => this.goals = res)
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
  addItem(){
    this.goals.push(this.goalTxt);
    this.goalTxt="";
    
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
  removeItem(i){
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
}
