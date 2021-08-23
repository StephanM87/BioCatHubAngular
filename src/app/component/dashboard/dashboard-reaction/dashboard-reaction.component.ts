import { Component, OnInit, Input } from '@angular/core';
import { Buffer, Condition } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'dashboard-reaction',
  templateUrl: './dashboard-reaction.component.html',
  styleUrls: ['./dashboard-reaction.component.css']
})
export class DashboardReactionComponent implements OnInit {
  @Input() reaction: Condition;
  public showReactionInformation: boolean;
  public progress: string;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.showReactionInformation = (this.reaction.temp.value > 0 || this.notNull(this.reaction.temp.unit) || 
      this.reaction.ph.value > 0 || this.checkBuffer(this.reaction.buffer) || this.reaction.others.length > 0);
    this.progress = this.dataService.getConditionProgress().toFixed();
  }

  notNull(value: string): boolean {
    return (value != undefined && value.trim().length > 0);
  }

  checkBuffer(buffer: Buffer): boolean {
    if(buffer != undefined) {
      return (this.notNull(buffer.type) || buffer.concentration > 0 || this.notNull(buffer.unit));
    }
    return false;
  }

}
