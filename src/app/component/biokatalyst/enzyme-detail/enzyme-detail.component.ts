import {Component, Input} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {EnzymePlaceholder} from 'src/properties/placeholder';
import {Attribute} from '../../../model/attribute';
import {Enzyme} from '../../../model/enzyme';

@Component({
  selector: 'app-enzyme-detail',
  templateUrl: './enzyme-detail.component.html',
  styleUrls: ['./enzyme-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class EnzymeDetailComponent {
  @Input() enzyme: Enzyme;
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = EnzymePlaceholder;

  constructor(public dataService: DataService) {
  }

  public addAttribute(): void {
    this.enzyme.others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    const index = this.enzyme.others.indexOf(other);
    if (index !== -1) {
      this.enzyme.others.splice(index, 1);
    }
  }

  public deleteEnzyme(): void {
    this.dataService.getExperiment().deleteEnzyme(this.enzyme);
  }

  public getProgress(): string {
    const progress = this.dataService.getEnzymeProgress(this.enzyme);
    return progress.toFixed();
  }

}
