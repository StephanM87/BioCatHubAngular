import { Component, OnInit, Input } from '@angular/core';
import { Condition } from 'src/app/model/biocatalysis';

@Component({
  selector: 'dashboard-reaction',
  templateUrl: './dashboard-reaction.component.html',
  styleUrls: ['./dashboard-reaction.component.css']
})
export class DashboardReactionComponent implements OnInit {
  @Input() reaction: Condition;
  public showReactionInformation: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showReactionInformation = (this.reaction.temp > 0 || this.notNull(this.reaction.unit) || 
      this.reaction.ph > 0 || this.notNull(this.reaction.buffer) || this.reaction.others.length > 0);
  }

  notNull(value: string): boolean {
    return (value != undefined && value.trim().length > 0);
  }

}
