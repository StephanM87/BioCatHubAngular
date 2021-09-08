import {Component} from '@angular/core';
import {ReactionPlaceholder} from 'src/properties/placeholder';
import {Attribute, Condition} from '../../model/biocatalysis';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css', '../../../assets/styles/form-styles.css']
})
export class ReactionComponent {

  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactionPlaceholder;

  constructor(public dataService: DataService) {
  }

  public getReaction(): Condition {
    return this.dataService.getExperiment().getReactionConditions();
  }

  public addAttribute(): void {
    this.getReaction().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    const index = this.getReaction().others.indexOf(other);
    if (index !== -1) {
      this.getReaction().others.splice(index, 1);
    }
  }

  public getProgress(): string {
    return this.dataService.getConditionProgress().toFixed();
  }

}
