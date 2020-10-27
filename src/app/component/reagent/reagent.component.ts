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

  private numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor(public dataService: DataService) {
    this.dialogVisible = false;
  }

  ngOnInit(): void {}

  public getFormula(formula: string): string {
    let result = '';
    if(formula != undefined) {
      let cahracters = formula.split('');
      cahracters.forEach(char => {
        if (this.numbers.indexOf(char) > -1 ){
          result += '<sub>' + char + '</sub>'; 
        } else {
          result += char; 
        }
      });
    }
    return result;
  }

  // Zentraler Zugriff auf die Reagents über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public getReactantCount(): number {
    let count = 0;
    this.getEnzymes().forEach(enzyme => {
      count += enzyme.reaction.educts.length;
      count += enzyme.reaction.products.length;
    });
    return count;
  }

  // Dialog ein- und ausblenden  
  public editReagent(reagent: Reactant) {
    this.dialogReagent = reagent;
    this.dialogVisible = true;
  }

  public hideDialog(): void {
    this.dialogReagent = undefined;
    this.dialogVisible = false;
  }

  public validate(): boolean {
    return true;
  }

}
