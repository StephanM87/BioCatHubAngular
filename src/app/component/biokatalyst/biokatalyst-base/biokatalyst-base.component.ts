import {Component} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {Enzyme} from '../../../model/enzyme';

@Component({
  selector: 'app-biokatalyst',
  templateUrl: './biokatalyst-base.component.html',
  styleUrls: ['./biokatalyst-base.component.css']
})
export class BiokatalystBaseComponent {

  public selectedEnzyme: Enzyme; // TODO not used, can we delete this?

  constructor(public dataService: DataService) {
  }

  // Central access to the enzymes via the Data Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public newEnzyme(): void {
    this.getEnzymes().push(new Enzyme());
  }

}
