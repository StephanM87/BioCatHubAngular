import { Component, OnInit } from '@angular/core';
import { Condition } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void { }
  
  public getReaction(): Condition {
    return this.dataService.getExperiment().getReactionConditions();
  }

}
