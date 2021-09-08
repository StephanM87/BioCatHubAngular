import {Component, Input} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {ReactantPlaceholder} from 'src/properties/placeholder';
import {Attribute} from '../../../model/attribute';
import {Reactant} from '../../../model/reactant';

@Component({
  selector: 'app-reactant-detail',
  templateUrl: './reactant-detail.component.html',
  styleUrls: ['./reactant-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class ReactantDetailComponent {

  @Input() reactant: Reactant;

  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactantPlaceholder;

  constructor(public dataService: DataService) {
  }


  public addAttribute(): void {
    if (this.reactant.others === undefined) {
      this.reactant.others = new Array<Attribute>();
    }
    this.reactant.others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    const index = this.reactant.others.indexOf(other);
    if (index !== -1) {
      this.reactant.others.splice(index, 1);
    }
  }

  public getProgress(): string {
    return this.dataService.getReactantProgress(this.reactant).toFixed();
  }
}
