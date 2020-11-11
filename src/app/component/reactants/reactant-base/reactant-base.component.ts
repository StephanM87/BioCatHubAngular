import { Component, OnInit } from '@angular/core';
import { Enzyme } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-reactants',
  templateUrl: './reactant-base.component.html',
  styleUrls: ['./reactant-base.component.css']
})
export class ReactantBaseComponent implements OnInit {

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}
  
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public getFormula(formula: string): string {
    return this.dataService.getFormulaHtml(formula);
  }

}
