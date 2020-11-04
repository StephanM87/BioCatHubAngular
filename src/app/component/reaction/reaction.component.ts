import { Component, OnInit } from '@angular/core';
import { Attribute, Condition } from '../../model/biocatalysis';
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

  // Attribute
  public addAttribute(): void {
    this.getReaction().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getReaction().others.indexOf(other);
    if (index !== -1) {
      this.getReaction().others.splice(index, 1);
    }
  }

}
