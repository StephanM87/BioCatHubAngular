import { Component, OnInit } from '@angular/core';
import { Vessel, ReactionCondition } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
  }

  // Vessel
  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }

  // Reaction
  public getReaction(): ReactionCondition {
    return this.dataService.getExperiment().getReaction();
  }

}
