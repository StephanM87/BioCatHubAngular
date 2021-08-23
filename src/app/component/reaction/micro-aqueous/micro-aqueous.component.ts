import { Component, OnInit } from '@angular/core';
import { ReactionPlaceholder } from 'src/properties/placeholder';
import { Attribute, Condition } from '../../../model/biocatalysis';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-micro-aqueous',
  templateUrl: './micro-aqueous.component.html',
  styleUrls: ['./micro-aqueous.component.css']
})
export class MicroAqueousComponent implements OnInit {
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactionPlaceholder;

  constructor(public dataService: DataService) { }

  ngOnInit(): void { }
  
  public getReaction(): Condition {
    return this.dataService.getExperiment().getReactionConditions();
  }
  
  


  public addAttribute(): void {
    this.getReaction().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getReaction().others.indexOf(other);
    if (index !== -1) {
      this.getReaction().others.splice(index, 1);
    }
  }

  public getProgress(): string {
    return this.dataService.getConditionProgress().toFixed();
  }

}
