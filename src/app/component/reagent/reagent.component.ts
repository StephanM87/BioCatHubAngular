import { Component, OnInit } from '@angular/core';
import { Enzyme, Reactant } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reagent',
  templateUrl: './reagent.component.html',
  styleUrls: ['./reagent.component.css']
})
export class ReagentComponent implements OnInit {

  public dialogVisible: boolean;
  public dialogReagent: Reactant;

  constructor(public dataService: DataService) {
    this.dialogVisible = false;
  }

  ngOnInit(): void {}

  public getFormula(formula: string): string {
    return this.dataService.getFormulaHtml(formula);
  }
  
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public getReactantCount(): number {
    return this.dataService.getReactantCount();
  }
  
  public editReagent(reagent: Reactant) {
    this.dialogReagent = reagent;
    this.dialogVisible = true;
  }

  public deleteEduct(enzyme: Enzyme, educt: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.educts, educt);
  }

  public deleteProduct(enzyme: Enzyme, product: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.products, product);
  }

  public hideDialog(): void {
    this.dialogReagent = undefined;
    this.dialogVisible = false;
  }

}
