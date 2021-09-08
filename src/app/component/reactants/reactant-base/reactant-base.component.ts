import {Component} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {Enzyme} from '../../../model/enzyme';

@Component({
  selector: 'app-reactants',
  templateUrl: './reactant-base.component.html',
  styleUrls: ['./reactant-base.component.css']
})
export class ReactantBaseComponent {

  constructor(public dataService: DataService) {
  }

  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public getFormula(formula: string): string {
    return this.dataService.getFormulaHtml(formula);
  }

}
