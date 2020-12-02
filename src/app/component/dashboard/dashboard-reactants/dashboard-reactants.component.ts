import { Component, OnInit, Input } from '@angular/core';
import { Enzyme, Reaction } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'dashboard-reactants',
  templateUrl: './dashboard-reactants.component.html',
  styleUrls: ['./dashboard-reactants.component.css']
})
export class DashboardReactantsComponent implements OnInit {
  @Input() enzymes: Enzyme[];
  public showReactantsInformation: boolean;
  public progress: string;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.showReactantsInformation = false;
    if(this.enzymes != undefined && this.enzymes.length > 0){
      this.enzymes.forEach(enzyme => {
        this.showReactantsInformation = this.showReactantsInformation || 
          (enzyme.reaction != undefined && this.getReactantCount(enzyme.reaction) > 0);
      });
    }
    this.setProgress();
  }

  setProgress() {
    let count = 0;
    let total = 0;
    if(this.enzymes != undefined){
      this.enzymes.forEach(enzyme => {
        if(enzyme.reaction != undefined){
          if(enzyme.reaction.educts != undefined){
            enzyme.reaction.educts.forEach(reactant => {
              count += this.dataService.getReactantProgress(reactant);
              total += 100;
            });
          }
          if(enzyme.reaction.products != undefined){
            enzyme.reaction.products.forEach(reactant => {
              count += this.dataService.getReactantProgress(reactant);
              total += 100;
            });
          }
        }
      });
    }
    let progressValue = total > 0 ? (count/total)*100 : 0;
    this.progress = progressValue.toFixed();
  }
  
  public getFormula(formula: string): string {
    return this.dataService.getFormulaHtml(formula);
  }

  public getReactantCount(reaction: Reaction): number {
    return ((reaction.educts ? reaction.educts.length : 0) + (reaction.products ? reaction.products.length : 0));
  }

}
