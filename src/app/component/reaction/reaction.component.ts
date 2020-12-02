import { Component, OnInit } from '@angular/core';
import { Attribute, Condition } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css', '../../../assets/styles/form-styles.css']
})
export class ReactionComponent implements OnInit {
  public progress: string;

  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];

  constructor(public dataService: DataService) {
    this.progress = "0";
  }

  ngOnInit(): void {
    this.updateProgress();
  }
  
  public getReaction(): Condition {
    return this.dataService.getExperiment().getReactionConditions();
  }
  
  public addAttribute(): void {
    this.getReaction().others.push(new Attribute());
    this.updateProgress();
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getReaction().others.indexOf(other);
    if (index !== -1) {
      this.getReaction().others.splice(index, 1);
    }
    this.updateProgress();
  }

  public updateProgress() {
    let progressCount = this.dataService.getConditionProgress();
    this.progress = progressCount.toFixed();
  }

}
